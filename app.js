require("dotenv").config();
const path = require("path");
const logger = require("morgan");
const express = require("express");
const bodyParser = require("body-parser");
const config = require("./configs/config");
const DBconnection = require("./configs/db");
const blogs = require("./routes/blogs");
const users = require("./routes/users");
const authRoutes = require("./routes/auth");
const comments = require("./routes/comments");
const categories = require("./routes/categories");
const notifications = require("./routes/notifications");

const { notFound, handleNotFound } = require("./utils/handleError");
DBconnection();
const app = express();
const cors = require("cors");
const corsOptions = { origin: "*" };
//var server = require("http").Server(app);
var io = require("socket.io")(4000);
app.use("/public/images", express.static(path.join(__dirname, "/public/images")));
app.use("/public/video", express.static(path.join(__dirname, "/public/video")));

app.use(logger("dev"));
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

const versionApi = (routeName) => `/api/v1/${routeName}`;

app.use(versionApi("blogs"), blogs);
app.use(versionApi("users"), users);
app.use(versionApi("auth"), authRoutes);
app.use(versionApi("comments"), comments);
app.use(versionApi("categories"), categories);
app.use(versionApi("notifications"), notifications);
//=================================================================
// const Comments = require("./models/comments");
// const asyncHandler = require("./middlewares/async");
// const mongoose = require("mongoose");
// app.post(
//   "/add",
//   asyncHandler(async (req, res, next) => {
//     const { from_blog_id, from_user_id, content, create_date } = req.body;
//     const comment = new Comments({
//       from_blog_id: mongoose.Types.ObjectId(from_blog_id),
//       from_user_id: mongoose.Types.ObjectId(from_user_id),
//       content,
//       create_date,
//     });
//     const result = await comment.save();
//     res.json({ result });
//   })
// );
//=================================================================

app.use(notFound);
app.use(handleNotFound);

io.on("connection", (socket) => {
  console.log("connect by socket.io");
  socket.emit("start", { name: "nhat" });

  socket.on("", (data) => {
    console.log(data);
  });
});

app.listen(config.PORT, function (err) {
  if (!err) {
    console.log(
      `Server running in ${config.ENV} mode on port ${config.PORT} - http://localhost:${config.PORT}`
    );
  } else {
    console.log("Sever run failly");
  }
});
