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
    return `${this.name.first} ${this.name.last}`;
  })
  .set(function (name) {
    const [firstName, lastName] = name.split(" ");
    this.name.first = firstName;
    this.name.last = lastName;
  });

const User = mongoose.model("User", userSchema);

exports.User = User;
