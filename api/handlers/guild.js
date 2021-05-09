const db = require("../../models");
const { asyncMiddleware } = require("../../middlewares/utils");

const createGuild = asyncMiddleware(async (req, res) => {
  const { name, createdBy, categories } = req.body;

  const guild = new db.Guild({ name, createdBy, categories });

  await guild.save();

  return res.set({ Location: "abc" }).status(201).json(guild);
});

exports.createGuild = createGuild;
