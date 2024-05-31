const errorMiddleware = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Backend error";
  const extraDetailes = err.extraDetailes || "Error from backend";

  res.status(status).json({ message, extraDetailes });
};

module.exports = errorMiddleware;
