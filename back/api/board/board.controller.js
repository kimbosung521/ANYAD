const pool = require("../../config/database")

exports.newBoard = (req, res) => {
  const param = [req.body.id, req.body.title, req.body.text]
  console.log(param)
  pool((conn) => {
    //b_id, u_id, b_title, b_text, b_time
    conn.query(
      "insert into tbl_board values(0, ?, ? ,?, now())",
      param,
      (err, doc) => {
        err
          ? // res.send({ result: false })
            console.log(err)
          : res.send({ result: true })
      }
    )
    conn.release()
  })
}

exports.getBoardList = (req, res) => {
  pool((conn) => {
    conn.query("select * from tbl_board", (err, row) => {
      err && res.send({ result: false })
      res.send({ result: true, data: row })
    })
    conn.release()
  })
}

exports.getBoard = (req, res) => {
  const param = /^\/([0-9a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]+)$/.exec(req.url)[1]
  pool((conn) => {
    conn.query("select * from tbl_board where b_id = ?", param, (err, row) => {
      err && res.send({ result: false })
      res.send({ result: true, data: row })
    })
    conn.release()
  })
}
