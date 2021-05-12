const mongoose = require("mongoose");

const Test = mongoose.model(
  "Test",
  new mongoose.Schema({
    obj: {
      type: new mongoose.Schema({
        a: String,
        b: String,
      }),
    },
  })
);

exports.Test = Test;
