const db = require("../../models");
const { withTransaction, asyncMiddleware } = require("../../helpers/mongoose");

const createGuild = withTransaction(async (session, req, res) => {
  const { name, createdBy, categories } = req.body;

  const guild = await new db.Guild({ name, createdBy, categories }).save({
    session,
  });

  const populatedGuild = await guild.populate("createdBy").execPopulate();

  await new db.GuildMember({
    guild: guild._id,
    name: populatedGuild.createdBy.fullName,
    user: populatedGuild.createdBy,
  }).save({
    session,
  });

  return res.set({ Location: "TODO" }).status(201).json(guild);
});

const getGuild = asyncMiddleware(async (req, res) => {
  res.json(req.guild);
});

const deleteGuild = asyncMiddleware(async (req, res) => {
  await req.guild.remove();
  res.status(204).end();
});

const createCategory = asyncMiddleware(async (req, res) => {
  const {
    guild,
    body: { name, channels },
  } = req;

  const categoriesCount = guild.categories.push({ name, channels });

  await guild.save();

  res
    .set({ Location: "TODO" })
    .status(201)
    .json(guild.categories[categoriesCount - 1]);
});

const getCategory = asyncMiddleware(async (req, res) => {
  res.json(req.category);
});

const deleteCategory = asyncMiddleware(async (req, res) => {
  const { guild, category } = req;

  guild.categories.pull(category._id);

  await guild.save();

  res.status(204).end();
});

exports.createGuild = createGuild;
exports.getGuild = getGuild;
exports.deleteGuild = deleteGuild;
exports.createCategory = createCategory;
exports.getCategory = getCategory;
exports.deleteCategory = deleteCategory;
exports.createChannel = createChannel;
