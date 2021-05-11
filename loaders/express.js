const express = require("express");
const fs = require("fs");

const app = express();

//get all route configurations
const fileNames = fs.readdirSync("./api/routes");
const routes = fileNames.map((fileName) =>
  require(`../api/routes/${fileName}`)
);

app.use(express.json());

//utilize all route configurations to create routes
for (const { uri, router } of routes) {
  app.use(`${uri}`, router);
}

app.listen(3000, () => console.log("listening on port 3000"));
