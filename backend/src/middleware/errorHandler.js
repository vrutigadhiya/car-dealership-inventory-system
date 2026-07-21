const errorHandler = (err, req, res, next) => {

  console.error(err);

  // Mongoose validation errors (missing fields, negative price/quantity, etc.)
  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: Object.values(err.errors).map((e) => e.message).join(", "),
    });
  }

  // Mongoose bad ObjectId errors (e.g. PUT/:id with a malformed id)
  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: "Invalid ID format",
    });
  }

  // Mongoose duplicate key errors (e.g. registering with an existing email)
  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "Duplicate field value entered",
    });
  }

  // Fallback for anything else (including errors you throw manually with err.status)
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });

};

module.exports = errorHandler;