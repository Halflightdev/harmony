const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  author: {
    type: mongoose.ObjectId,
    ref: "User",
    required: true,
  },
  chat: {
    type: mongoose.ObjectId,
    ref: "TextChat",
    required: true,
  },
  content: String,
});

const Message = mongoose.model("Message", messageSchema);

exports.Message = Message;
