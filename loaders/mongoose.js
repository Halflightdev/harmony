const mongoose = require("mongoose");
const {
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_HOST,
} = require("../config");

mongoose.connect(
  `mongodb+srv://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_HOST}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

mongoose.connection.once("open", () => {
  console.log("connected to database.");
});
