const express = require("express");

const router = express.Router();

router.route("/").get((req, res) => {
  res.send("guildget");
});

module.exports = { uri: "/guild", router };
