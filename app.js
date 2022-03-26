require("dotenv").config();
const express = require("express");
const path = require("path");
const config = require("./configs/config");
const bodyParser = require("body-parser");
const logger = require("morgan");

const DBconnection = require("./configs/db");

const accounts = require("./models/user");
const asyncHandler = require("./middlewares/async");

const app = express();
const authRoutes = require("./routes/auth");
const { notFound, handleNotFound } = require("./utils/handleError");
const posts = require("./routes/posts");
var cors = require("cors");

DBconnection();

var corsOptions = {
  origin: "*",
};

app.use("/public/images", express.static(path.join(__dirname, "/public/images")));
app.use("/public/video", express.static(path.join(__dirname, "/public/video")));

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(logger("dev"));

const versionApi = (routeName) => `/api/v1/${routeName}`;
app.use(versionApi("auth"), authRoutes);
app.use(versionApi("posts"), posts);

// app.post(
//   "/add-user",
//   asyncHandler(async (req, res, next) => {
//     const { user } = req.body;
//     const account = new accounts({ ...user });
//     const result = await account.save();
//     res.status(200).json({ result });
//   })
// );

// Handle error
app.use(notFound);
app.use(handleNotFound);

//Open port
app.listen(config.PORT, function (err) {
  if (!err) {
    console.log(
      `Server running in ${config.ENV} mode on port ${config.PORT} - http://localhost:${config.PORT}`
    );
  } else {
    console.log("sever run failly");
  }
});
