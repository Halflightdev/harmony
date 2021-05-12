const express = require("express");
const handlers = require("../handlers/guild");
const db = require("../../models");

const router = express.Router();

router.param("guildId", async (req, res, next, guildId) => {
  try {
    const guild = await db.Guild.findById(guildId).exec();
    if (!guild) {
      const error = new Error(`Guild with ID ${guildId} does not exist.`);
      error.status = 404;
      throw error;
    }
    req.guild = guild;
    next();
  } catch (error) {
    next(error);
  }
});

router.route("/").post(handlers.createGuild);

router.route("/:guildId").get(handlers.getGuild);

router.route("/:guildId/categories/").post(handlers.createCategory);

router.route("/:guildId/categories/:categoryId").get(handlers.getCategory);

module.exports = { uri: "/guilds", router };
