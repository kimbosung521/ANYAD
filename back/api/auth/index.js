const router = require("express").Router(),
  auth = require("./auth.controller")

router.post("/", auth.login)
router.post("/register", auth.register)
router.post("/check", auth.checkEmail)

module.exports = router
