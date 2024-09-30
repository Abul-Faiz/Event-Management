const Joi = require("joi");

const eventSchema = Joi.object({
  eventName: Joi.string().trim().required().messages({
    "string.base": "Event name must be a string",
    "string.empty": "Event name cannot be empty",
    "any.required": "Event name is required",
  }),
  description: Joi.string().required().messages({
    "string.base": "Description must be a string",
    "string.empty": "Description cannot be empty",
    "any.required": "Description is required",
  }),
  startTime: Joi.date().optional().messages({
    "date.base": "Start time must be a valid date",
  }),
  endTime: Joi.date().optional().messages({
    "date.base": "End time must be a valid date",
  }),
});

module.exports = { eventSchema };
