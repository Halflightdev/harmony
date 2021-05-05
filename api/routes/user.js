const express = require("express");
const db = require("../../models");
const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    res.send("userget");
  })
  .post((req, res) => {});

module.exports = { uri: "/user", router };
