const express = require("express");
const handlers = require("../handlers/guild");

const router = express.Router();

router.route("/").post(handlers.createGuild);

router.route("/:guildId").get(handlers.getGuild);

module.exports = { uri: "/guild", router };
