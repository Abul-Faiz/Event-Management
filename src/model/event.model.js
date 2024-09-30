const mongoose = require("mongoose");

const eventSchema = mongoose.Schema(
  {
    eventName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Event", eventSchema);
