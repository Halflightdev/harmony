const express = require("express");
const handlers = require("../handlers/guild");

const router = express.Router();

router.route("/").post(handlers.createGuild);

module.exports = { uri: "/guild", router };
