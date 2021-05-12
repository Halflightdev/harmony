const mongoose = require("mongoose");
const {
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_HOST,
} = require("../config");
const db = require("../models");

mongoose
  .connect(
    `mongodb+srv://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_HOST}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .catch(console.error);

mongoose.connection.once("open", () => {
  mongoose.connection.on("error", console.error);
  console.log("connected to database.");
});

// for (let i = 0; i < 10000; i++) {
//   new db.Test({ "obj.a": "hello!" }).save();
// }
