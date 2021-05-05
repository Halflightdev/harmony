const express = require("express");
const fs = require("fs");

const app = express();

//get all route configurations
const fileNames = fs.readdirSync("./api/routes");
const routes = fileNames.map((fileName) =>
  require(`../api/routes/${fileName}`)
);

//utilize all route configurations to create routes
for (const { uri, router } of routes) {
  app.use(`${uri}`, router);
}

app.get("/user/:id", (req, res) => {
  return res.send("<h2>hello mr. user!</h2>");
});

app.listen(3000, () => console.log("listening on port 3000"));
