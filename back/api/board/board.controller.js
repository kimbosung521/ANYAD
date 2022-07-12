const pool = require("../../config/database")

exports.newBoard = (req, res) => {
  const param = [req.body.id, req.body.title, req.body.text]
  pool((conn) => {
    const sql = "insert into tbl_board values(0, ?, ? ,?, now())"
    conn.query(sql, param, (err, doc) => {
      err
        ? req.send({ result: false, message: err })
        : res.send({ result: true })
    })
    conn.release()
  })
}

exports.getBoardList = (req, res) => {
  pool((conn) => {
    const sql = "select * from tbl_board"
    conn.query(sql, (err, row) => {
      err && res.send({ result: false, message: err })
      res.send({ result: true, data: row })
    })
    conn.release()
  })
}

exports.getBoard = (req, res) => {
  const param = req.params.id
  pool((conn) => {
    const sql = "select * from tbl_board where b_id = ?"
    conn.query(sql, param, (err, row) => {
      err && res.send({ result: false, message: err })
      res.send({ result: true, data: row })
    })
    conn.release()
  })
}

exports.search = (req, res) => {
  const param = req.param("keyword")
  pool((conn) => {
    const sql = "select * from tbl_board where b_title like %?%"
    conn.query(sql, param, (err, row) => {
      if (err) res.send({ result: false, message: err })
      row && res.send({ result: true, data: row })
    })
    conn.release()
  })
}
