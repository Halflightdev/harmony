const mongoose = require("mongoose");

const channelSchema = {
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["voice", "text"],
    default: "text",
  },
};

const categorySchema = {
  name: {
    type: String,
    required: true,
  },
  channels: [channelSchema],
};

const guildSchema = new mongoose.Schema({
  name: { type: String, required: true },
  createdBy: {
    type: mongoose.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  categories: [categorySchema],
  channels: [channelSchema],
});

const Guild = mongoose.model("Guild", guildSchema);

exports.Guild = Guild;
