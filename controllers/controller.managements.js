const asyncHandler = require("../middlewares/async");
const Users = require("../models/users");
const Blogs = require("../models/blogs");
const mongoose = require("mongoose");
const statusResponse = require("../utils/statusResponse");
const Comments = require("../models/comments");

const createAdmin = asyncHandler(async (req, res, next) => {
  const { username, password, email, fullname, created_date } = req.body;
  const account = new Users({ username, password, email, fullname, created_date, role: "admin" });
  await account.save();
  res.status(200).json({ result: account });
});

// LOCK AND UNLOCK USER, CREATE ADMIN,  NOT YET DELETE ADMIN
const lockUser = asyncHandler(async (req, res, next) => {
  const role = req.role;
  const { user_id } = req.body;
  if (user_id == req._id && req.username == "duyen") {
    res.status(500).json({ ...statusResponse(500, "Fail", "Couldn't lock this account") });
  }
  try {
    if (role == "admin") {
      await Users.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(user_id) },
        { status: "block" }
      ).lean();
      res.status(200).json({ ...statusResponse(200, "OK", "Successfully") });
    } else {
      res.status(500).json({ ...statusResponse(500, "Fail", "Couldn't lock this account") });
    }
  } catch (e) {
    res.status(400).json({ ...statusResponse(400, "Fail", "Couldn't lock this account") });
  }
});

const listLockedUsers = asyncHandler(async (req, res, next) => {
  const role = req.role;
  const { user_id } = req.body;
  try {
    if (role == "admin") {
      const result = await Users.find({ status: "block" }).lean();
      res.status(200).json({ ...statusResponse(200, "OK", "Successfully"), result });
    } else {
      res.status(500).json({ ...statusResponse(500, "Fail", "Couldn't delete this account") });
    }
  } catch (e) {
    res.status(400).json({ ...statusResponse(400, "Fail", "Couldn't delete this account") });
  }
});

const unlockUser = asyncHandler(async (req, res, next) => {
  const role = req.role;
  const { user_id } = req.body;
  if (user_id == req._id && req.username == "duyen") {
    res.status(500).json({ ...statusResponse(500, "Fail", "Couldn't lock this account") });
  }
  try {
    if (role == "admin") {
      await Users.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(user_id) },
        { status: "public" }
      ).lean();
      res.status(200).json({ ...statusResponse(200, "OK", "Successfully") });
    } else {
      res.status(500).json({ ...statusResponse(500, "Fail", "Couldn't lock this account") });
    }
  } catch (e) {
    res.status(400).json({ ...statusResponse(400, "Fail", "Couldn't lock this account") });
  }
});

// LIST LOCKED BLOGS, LOCK AND UNLOCK BLOG
const lockBlog = asyncHandler(async (req, res, next) => {
  const { blog_id } = req.body;
  const result = Blogs.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(blog_id) },
    { status: "block" }
  ).lean();
  res.status(200).json({ result });
});
const listLockedBlogs = asyncHandler(async (req, res, next) => {
  const result = Blogs.find({ status: "block" }).lean();
  res.status(200).json({ result });
});
const unlockBlog = asyncHandler(async (req, res, next) => {
  const { blog_id } = req.body;
  const result = Blogs.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(blog_id) },
    { status: "public" }
  ).lean();
  res.status(200).json({ result });
});
// LIST LOCKED COMMENT, LOCK AND UNLOCK COMMENT
const lockComment = asyncHandler(async (req, res, next) => {
  const { comment_id } = req.body;
  const result = Comments.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(comment_id) },
    { status: "block" }
  );
  res.status(200).json({ result });
});

const listLockedComments = asyncHandler(async (req, res, next) => {
  const result = Comments.find({ status: "block" }).lean();
  res.status(200).json({ result });
});
const unlockComment = asyncHandler(async (req, res, next) => {
  const { comment_id } = req.body;
  const result = Comments.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(comment_id) },
    { status: "public" }
  );
  res.status(200).json({ result });
});
module.exports = {
  createAdmin,
  lockUser,
  listLockedUsers,
  unlockUser,
  lockBlog,
  listLockedBlogs,
  unlockBlog,
  lockComment,
  listLockedComments,
  unlockComment,
};
