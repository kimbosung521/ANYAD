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

exports.register = (req, res) => {
  const { email, pw, name } = req.body
  bcrypt.hash(pw, 10, (err, hash) => {
    if (err) res.send({ result: false, message: err })
    pool((conn) => {
      const sql = "insert into tbl_user(email, name, pw) values(?,?,?)"
      conn.query(sql, [email, name, hash], (err, result) => {
        if (err) res.send({ result: false, message: err })
        result && res.send({ result: true })
      })
      conn.release()
    })
  })
}
