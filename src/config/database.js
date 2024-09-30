const mongoose = require("mongoose");
require('dotenv').config()

async function databaseConnection() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = { databaseConnection };