const express = require("express");
const db = require("../../models");
const handlers = require("../handlers/user");

const router = express.Router();

router.route("/").post(handlers.createUser);

module.exports = { uri: "/users", router };
