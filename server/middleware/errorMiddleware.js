const errorMiddleware = (err, req, res, next) => {
  const defaultError = {
    statusCode: 500,
    success: "failed",
    message: err,
  };

  console.error(err);

  if (err?.name === "ValidationError") {
    defaultError.statusCode = 400;
    defaultError.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
  }
  // Duplicate key error
  if (err?.code && err?.code === 11000) {
    defaultError.statusCode = 400;
    defaultError.message = `Duplicate ${Object.keys(err.keyPattern).join(
      ", "
    )} must be unique`;
  }

  res
    ?.status(defaultError.statusCode)
    .json({ success: defaultError.success, message: defaultError.message });
};

module.exports = { errorMiddleware };
