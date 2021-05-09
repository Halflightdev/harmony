const mongoose = require("mongoose");
const db = require("./index");

const channelSchema = {
  name: {
    type: String,
    required: true,
  },
  typeModel: {
    type: String,
    enum: ["TextChat"],
    default: "TextChat",
  },
  type: {
    type: mongoose.ObjectId,
    refPath: "typeModel",
    required: true,
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
    validate: {
      validator: (userId) => db.User.exists({ _id: userId }),
      message: "There is no user with ID {VALUE}.",
    },
  },
  createdAt: { type: Date, default: Date.now },
  categories: [categorySchema],
  channels: [channelSchema],
});

const Guild = mongoose.model("Guild", guildSchema);

exports.Guild = Guild;
