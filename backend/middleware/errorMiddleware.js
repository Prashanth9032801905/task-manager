const errorHandler = (err, req, res, next) => {
  // Ensure err is an Error object
  if (!err) {
    err = new Error("Unknown error occurred");
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  // Don't send response if headers already sent
  if (res.headersSent) {
    return;
  }

  res.status(statusCode).json({
    success: false,
    message: message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

module.exports = { errorHandler, notFound };
