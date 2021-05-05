const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

//get all model filenames
const fileNames = fs
  .readdirSync("./models")
  .filter(
    (fileName) =>
      path.basename(__filename) !== fileName && fileName.match(/.+\.js$/)
  );

//require each module to force it to load before trying to retrieve it with mongoose.model
fileNames.forEach((fileName) => {
  require(`./${fileName}`);

  fileName = fileName.slice(0, -3);

  module.exports[fileName] = mongoose.model(fileName);
});
