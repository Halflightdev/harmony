const mongoose = require("mongoose");

const textChatSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["group", "direct", "guild"],
    required: true,
  },
  users: [{ type: mongoose.ObjectId, ref: "User" }],
});

const TextChat = mongoose.model("TextChat", textChatSchema);

exports.TextChat = TextChat;
