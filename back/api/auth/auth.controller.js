const pool = require("../../config/database"),
  bcrypt = require("bcryptjs"),
  nodemailer = require("nodemailer"),
  emailData = require("../../config/emailData"),
  jwt = require("jsonwebtoken"),
  secretKey = "Secret_Key"

exports.login = (req, res) => {
  const param = [req.body.id, req.body.pw],
    accessToken = jwt.sign({ id: param[0] }, secretKey, { expiresIn: "1h" })
  pool((conn) => {
    conn.query("select * from tbl_user where u_id=?", param[0], (err, row) => {
      err && res.send({ result: false })
      row.length > 0
        ? bcrypt.compare(param[1], row[0].u_pw, (err, result) => {
            err && res.send({ result: false })
            if (result) {
              res
                .cookie("x_auth", accessToken, {
                  maxAge: 1000 * 60 * 60 * 24 * 7,
                  httpOnly: true,
                })
                .send({ result: true, info: [row[0].u_name, row[0].u_id] })
            } else {
              res.send({ result: false })
            }
          })
        : res.send({ result: false })
    })
    conn.release()
  })
}

exports.register = (req, res) => {
  const { email, pw, name } = req.body
  bcrypt.hash(pw, 10, (err, hash) => {
    if (err) res.send({ result: false, message: err })
    pool((conn) => {
      const sql = "insert into tbl_user(email, name, pw) values(?,?,?)"
      conn.query(sql, [email, name, hash], (err, result) => {
        err
          ? res.send({ result: false, message: err })
          : res.send({ result: true })
      })
      conn.release()
    })
  })
}

exports.checkEmail = async (req, res) => {
  const checkCode = String(emailData.number())
  const transporter = nodemailer.createTransport({
    service: "Naver",
    prot: 587,
    host: "smtp.naver.com",
    secure: false,
    requireTLS: true,
    auth: {
      user: emailData.user,
      pass: emailData.pw,
    },
  })

  const mailOptions = {
    from: emailData.user,
    to: req.body.email,
    subject: "[ANYAD Sign Up Check Code]",
    text: `Your Code : ${checkCode}`,
  }
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) console.log(err)
    res.send({ code: checkCode })
  })
}
