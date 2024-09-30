function response(Type, statusCode, Message, AdditionalData = null) {
  if (AdditionalData) {
    return {
      message: Type,
      statusCode: statusCode,
      Type: Message,
      res: AdditionalData,
    };
  }
  console.log({
    message: Type,
    statusCode: statusCode,
    Type: Message,
    AdditionalData,
  });
  return {
    message: Type,
    statusCode: statusCode,
    Type: Message,
  };
}

function errorResponse(Type, statusCode, Error) {
  console.log({ message: Type, statusCode: statusCode, Type: Error });
  return { message: Type, statusCode: statusCode, Type: Error };
}

module.exports = { response, errorResponse };
