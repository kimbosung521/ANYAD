const pool = require("../../config/database"),
  bcrypt = require("bcryptjs"),
  nodemailer = require("nodemailer"),
  emailData = require("../../config/emailData")

exports.login = (req, res) => {
  const { id, pw } = req.body
  pool((conn) => {
    const sql = "select * from tbl_user where id = ?"
    conn.query(sql, [id], (err, row) => {
      if (err) res.send({ result: false, message: err })
      if (row.length > 0) {
        bcrypt.compare(pw, row[0].pw, (err, result) => {
          if (err) res.send({ result: false, message: err })
          result
            ? res.send({ result: true })
            : res.send({ result: false, message: "PW ERR" })
        })
      }
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
