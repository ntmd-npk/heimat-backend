module.exports = {
  ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 5000,
  HOST: process.env.HOST || "0.0.0.0",
  MONGODB_URI:
    process.env.MONGODB_URI ||
    "mongodb+srv://Nhat257:WeSvpjPO1S5NNT2L@cluster0.fvw2o.mongodb.net/Heimat?retryWrites=true&w=majority",
};
