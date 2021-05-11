const mongoose = require("mongoose");

const guildMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  guild: {
    type: mongoose.ObjectId,
    required: true,
  },
});

const GuildMember = new mongoose.model("GuildMember", guildMemberSchema);

exports.GuildMember = GuildMember;
