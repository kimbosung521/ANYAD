const router = require("express").Router(),
  auth = require("./auth"),
  board = require("./board")

router.use("/board", board)
router.use("/auth", auth)

module.exports = router
