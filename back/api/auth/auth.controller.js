const pool = require("../../config/database"),
  bcrypt = require("bcryptjs")

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

exports.register = (req,res) => {
    const {email , pw, name} = req.body
    pool((conn) => {
        const sql = "insert into tbl_user(email, name, pw) values(?,?,?)"
        const hash = await bcrypt.hash(pw, 10)
        conn.query(sql, [email, hash, name], (err, result) => {
            if(err) res.send({result : false, message : err})
            result && res.send({result : true})
        })
        conn.release()
    })
}