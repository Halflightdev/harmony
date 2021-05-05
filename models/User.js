const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    first: String,
    last: String,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    set: (email) => email.toLowerCase(),
  },
  guilds: [{ type: mongoose.ObjectId, ref: "Guild" }],
});

userSchema
  .virtual("fullName")
  .get(function () {
    return this.name.first + this.name.last;
  })
  .set((v) => console.log(this));

const User = mongoose.model("User", userSchema);

exports.User = User;
