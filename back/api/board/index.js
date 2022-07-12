const router = require("express").Router(),
  board = require("./board.controller")

router.post("/", board.newBoard)
router.get("/", board.getBoardList)
router.get("/search", () => console.log("TEST"))
router.get("/:id", board.getBoard)

module.exports = router
