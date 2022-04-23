module.exports = {
  ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 5000,
  HOST: process.env.HOST || "0.0.0.0",
  MONGODB_URI:
    process.env.MONGODB_URI ||
    "mongodb+srv://Nhat257:7IHBeB7L0qJ8CDpZ@cluster0.fvw2o.mongodb.net/Heimat?retryWrites=true&w=majority",
};
