const express = require("express");

const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    res.send("userget");
  })
  .post((req, res) => {
    console.log(req.body);
    res.json(req.body);
  });

module.exports = { uri: "/user", router };
