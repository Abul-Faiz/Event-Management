const { response } = require("../helper/response.helper");
const { responseEnum } = require("../helper/response.enum");
const { statusCodeEnum } = require("../helper/status.enum");

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      console.log("Validation error:", error.name);
      return res
        .status(400)
        .json(
          response(
            responseEnum.Error,
            statusCodeEnum.HTTP_BAD_REQUEST,
            error.message
          )
        );
    }
    next();
  };
};

module.exports = validate;
