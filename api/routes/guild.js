const express = require("express");
const handlers = require("../handlers/guild");
const db = require("../../models");
const { asyncMiddleware } = require("../../helpers/mongoose");

const router = express.Router();

router.param(
  "guildId",
  asyncMiddleware(async (req, res, next, guildId) => {
    console.log(guildId);
    const guild = await db.Guild.findById(guildId).exec();
    if (!guild) {
      const error = new Error(`Guild with ID ${guildId} does not exist.`);
      error.status = 404;
      throw error;
    }
    req.guild = guild;
    next();
  })
);

router.param(
  "categoryId",
  asyncMiddleware(async (req, res, next, categoryId) => {
    const category = req.guild.categories.id(categoryId);
    if (!category) {
      const error = new Error(`Category with ID ${categoryId} does not exist.`);
      error.status = 404;
      throw error;
    }
    req.category = category;
    next();
  })
);

router.param(
  "channelId",
  asyncMiddleware(async (req, res, next, channelId) => {
    const channel = req.categories.channels.id(channelId);
    if (!channel) {
      const error = new Error(`Channel with ID ${channelId} does not exist.`);
      error.status = 400;
      throw error;
    }
    req.channel = channel;
    next();
  })
);

router.route("/").post(handlers.createGuild);

router.route("/:guildId").get(handlers.getGuild).delete(handlers.deleteGuild);

router.route("/:guildId/categories/").post(handlers.createCategory);

router
  .route("/:guildId/categories/:categoryId")
  .get(handlers.getCategory)
  .delete(handlers.deleteCategory);

router.route("/");

module.exports = { uri: "/guilds", router };
