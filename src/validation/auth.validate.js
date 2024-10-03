const Joi = require("joi");

const signupSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    "string.base": `name must be a string`,
    "string.empty": `name cannot be empty`,
    "any.required": `name is required`,
  }),
  email: Joi.string().trim().email().required().messages({
    "string.base": `Email must be a string`,
    "string.empty": `Email cannot be empty`,
    "string.email": `Invalid email format`,
    "any.required": `Email is required`,
  }),
  password: Joi.string().min(6).trim().required().messages({
    "string.base": "password must be string",
    "string.empty": "password cannot be empty",
    "string.min": "Password must be at least 6 characters long",
    "any.required": "password is required",
  }),
  profilePicture: Joi.string().allow().messages({
    "string.base": `profilePicture must be a string`,
    "string.empty": "password cannot be empty",
  }),
  favoriteGenres: Joi.array().items(Joi.string()).optional().messages({
    "array.base": `favoriteGenres must be an array`,
    "array.empty": `favoriteGenres cannot be empty`,
  }),
  role: Joi.string()
    .valid("ADMIN", "USER")
    .allow()
    .default("USER")
    .messages({
      "any.only": "Role must be either ADMIN or USER",
      "any.required": "Role is required",
    }),
});

const loginSchema = Joi.object({
  email: Joi.string().trim().email().required().messages({
    "String.base": "email must be string",
    "string.empty": "email cannot be empty",
    "string.email": "Invalid email format",
    "any.required": "email is required",
  }),
  password: Joi.string().min(6).trim().required().messages({
    "string.base": "password must be string",
    "string.empty": "password cannot be empty",
    "string.min": "Password must be at least 6 characters long",
    "any.required": "password is required",
  }),
});

module.exports = { signupSchema, loginSchema };
