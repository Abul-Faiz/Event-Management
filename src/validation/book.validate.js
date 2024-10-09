const Joi = require("joi");

const bookSchema = Joi.object({
  title: Joi.string().trim().required().messages({
    "string.base": "title must be a string",
    "string.empty": "title cannot be empty",
    "any.required": "title is required",
  }),
  author: Joi.string().required().messages({
    "string.base": "author must be a string",
    "string.empty": "author cannot be empty",
    "any.required": "author is required",
  }),
  year: Joi.number()
    .integer()
    .min(1000)
    .max(new Date().getFullYear())
    .required()
    .messages({
      "number.base": "year must be a valid year",
    }),
  genres: Joi.array().items(Joi.string()).required().messages({
    "array.base": "genres must be a valid data",
    "array.empty": "genres cannot be empty",
  }),
});

module.exports = { bookSchema };
