const mongoose = require("mongoose");
require("dotenv").config();
const { response } = require("../helper/response.helper");
const { responseEnum } = require("../helper/response.enum");

async function databaseConnection() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

function ConnectionStringVerification(req, res, next) {
  if (mongoose.connection.readyState !== 1) {
    return res.send(response(responseEnum.Error, responseEnum.Disconnected));
  }
  next();
}

module.exports = { databaseConnection, ConnectionStringVerification };
