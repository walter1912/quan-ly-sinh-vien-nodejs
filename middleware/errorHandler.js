const { errorCode } = require("../constants");

function errorHandler(err, req, res, next) {
  const statusCode = res.statusCode ? res.statusCode : 500;

  switch (statusCode) {
    case errorCode.VALIDATION_ERROR:
      res.json({
        title: "validation error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case errorCode.UNAUTHORIZED:
      res.json({
        title: "Unauthorized",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case errorCode.FORBIDDEN:
      res.json({
        title: "Forbidden",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case errorCode.NOT_FOUND:
      res.json({
        title: "Not found",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case errorCode.SERVER_ERROR:
      res.json({
        title: "Server error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    default:
      console.log("No error! Next step");
      break;
  }
}

module.exports = {
  errorHandler,
};
