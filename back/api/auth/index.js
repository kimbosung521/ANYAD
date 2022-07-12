const router = require("express").Router(),
  auth = require("./auth.controller")

router.post("/", board.newBoard)
router.get("/", board.getBoardList)
router.get("/:id", board.getBoard)

module.exports = router
