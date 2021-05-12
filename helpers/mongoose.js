const mongoose = require("mongoose");

const asyncMiddleware = (handler) => async (req, res, next) => {
  try {
    await handler(req, res, next);
  } catch (err) {
    next(err);
  }
};

const withTransaction = (handler) => {
  return asyncMiddleware(async (req, res, next) => {
    await mongoose.connection.transaction(async (session) => {
      await handler(session, req, res, next);
    });
  });
};

exports.asyncMiddleware = asyncMiddleware;
exports.withTransaction = withTransaction;
