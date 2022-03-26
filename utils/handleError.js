function notFound(req, res, next) {
  const err = new Error("Not found");
  err.status = 404;
  next(err);
}

function handleNotFound(err) {
  const error = app.get("env") === "development" ? err : {};
  const status = err.status || 500;
  return res.status(status).json({
    error: {
      message: error.message,
    },
  });
}

module.exports = {
  notFound,
  handleNotFound,
};
