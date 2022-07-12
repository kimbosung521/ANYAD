const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  cors = require("cors")

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get("/", (req, res) => res.send(`SERVER ON! PORT : ${port}`))
const port = 8000
app.listen(port, () => console.log(`SERVER ON! PORT : ${port}`))
