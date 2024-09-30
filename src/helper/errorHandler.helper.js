const { errorResponse } = require("./response.helper");
const { statusCodeEnum } = require("./status.enum");
const { responseEnum } = require("./response.enum");

function errorHandler(err) {
  if (err.name === "ValidationError") {
    if (err?.errors) {
      const errorMessages = [];
      Object.keys(err.errors).forEach((key) => {
        const errorMessage = err.errors[key].message;
        errorMessages.push(errorMessage);
      });
      return errorResponse(
        responseEnum.Error,
        statusCodeEnum.HTTP_BAD_REQUEST,
        errorMessages
      );
    }
  } else {
    return errorResponse(
      responseEnum.Error,
      statusCodeEnum.HTTP_INTERNAL_SERVER_ERROR,
      err.message
    );
  }
}

module.exports = { errorHandler };
