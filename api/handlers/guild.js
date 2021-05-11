const db = require("../../models");
const { withTransaction, asyncMiddleware } = require("../../middlewares/utils");

const createGuild = withTransaction(async (session, req, res) => {
  const { name, createdBy, categories } = req.body;

  const guild = await new db.Guild({ name, createdBy, categories }).save({
    session,
  });

  const populatedGuild = await guild.populate("createdBy").execPopulate();

  await new db.GuildMember({
    guild: guild._id,
    name: populatedGuild.createdBy.fullName,
  }).save({
    session,
  });

  return res.set({ Location: "abc" }).status(201).json(guild);
});

const getGuild = asyncMiddleware(async (req, res) => {
  const guild = await db.Guild.findById(req.params.guildId).lean().exec();
  if (!guild) {
    res.status(404).send("Guild does not exist.");
  }

  res.json(guild);
});

exports.createGuild = createGuild;
exports.getGuild = getGuild;
