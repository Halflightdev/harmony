const mongoose = require("mongoose");

const guildMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  guild: {
    type: mongoose.ObjectId,
    required: true,
    ref: "Guild",
  },
  user: { type: mongoose.ObjectId, required: true, ref: "User" },
});

const GuildMember = new mongoose.model("GuildMember", guildMemberSchema);

exports.GuildMember = GuildMember;
