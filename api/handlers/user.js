const { asyncMiddleware } = require("../../middlewares/utils");
const db = require("../../models");

const createUser = asyncMiddleware(async (req, res) => {
  const { username, email, fullName } = req.body;
  const user = new db.User({
    fullName,
    username,
    email,
  });
  await user.save();
  res.status(201).json(user);
});

exports.createUser = createUser;
