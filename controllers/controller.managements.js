const asyncHandler = require("../middlewares/async");
const Users = require("../models/users");
const Blogs = require("../models/blogs");
const mongoose = require("mongoose");
const statusResponse = require("../utils/statusResponse");
const Comments = require("../models/comments");

const createAdmin = asyncHandler(async (req, res, next) => {
  const { username, password, email, fullname, created_date } = req.body;
  const checking = await Users.findOne({ $or: [{ username }, { email }] }).lean();
  if (checking) {
    res.json({ result: "account existed" });
  }
  const account = new Users({
    username,
    password,
    email,
    fullname,
    created_date: new Date(created_date),
    role: "admin",
  });
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

const searchBlogsAndUsers = asyncHandler(async (req, res, next) => {
  const { keyword } = req.body;
  const users = await Users.find({ fullname: { $regex: keyword, $options: "i" } }).lean();
  const blogs = await Blogs.aggregate([
    {
      $match: {
        title: { $regex: keyword, $options: "i" },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "user_id",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "category_id",
        foreignField: "_id",
        as: "category",
      },
    },
    {
      $project: {
        "category.name": 1,
        user: {
          avatar: 1,
          cover: 1,
          username: 1,
          fullname: 1,
          description: 1,
          followers: 1,
          following: 1,
          _id: 1,
        },
        title: 1,
        content: 1,
        created_date: 1,
        upvote: 1,
        downvote: 1,
        cover: 1,
      },
    },
  ]);

  res.status(200).json({ users, blogs });
});

const statistical = asyncHandler(async (req, res, next) => {
  const { date } = req.body;
  const totalUser = await Users.countDocuments();
  const totalUserInMonth = await Users.countDocuments({ $gte: { created_date: new Date(date) } });
  const totalBlogs = await Blogs.countDocuments();
  const totalBlogsInMonth = await Blogs.countDocuments({ $gte: { created_date: new Date(date) } });
  const totalComments = await Comments.countDocuments();
  const totalCommentsInMonth = await Comments.countDocuments({
    $gte: { created_date: new Date(date) },
  });
  const week = 1000 * 60 * 60 * 24 * 7;
  const dateOne = new Date(date) - week;
  const dateTwo = new Date(date) - week * 2;
  const dateThree = new Date(date) - week * 3;
  const dateFour = new Date(date) - week * 4;
  const dateFive = new Date(date) - week * 5;
  const dateSix = new Date(date) - week * 6;
  const dateSeven = new Date(date) - week * 7;
  const dateEight = new Date(date) - week * 8;

  const weekOne = await Blogs.countDocuments({
    created_date: {
      $gte: new Date(dateOne),
      $lte: new Date(date),
    },
  });
  const weekTwo = await Blogs.countDocuments({
    created_date: {
      $gte: new Date(dateTwo),
      $lte: new Date(dateOne),
    },
  });
  const weekThree = await Blogs.countDocuments({
    created_date: {
      $gte: new Date(dateThree),
      $lte: new Date(dateTwo),
    },
  });
  const weekFour = await Blogs.countDocuments({
    created_date: {
      $gte: new Date(dateFour),
      $lte: new Date(dateThree),
    },
  });
  const weekFive = await Blogs.countDocuments({
    created_date: {
      $gte: new Date(dateFive),
      $lte: new Date(dateFour),
    },
  });
  const weekSix = await Blogs.countDocuments({
    created_date: {
      $gte: new Date(dateSix),
      $lte: new Date(dateFive),
    },
  });
  const weekSeven = await Blogs.countDocuments({
    created_date: {
      $gte: new Date(dateSeven),
      $lte: new Date(dateSix),
    },
  });
  const weekEight = await Blogs.countDocuments({
    created_date: {
      $gte: new Date(dateEight),
      $lte: new Date(dateSeven),
    },
  });
  const category = await Blogs.aggregate([
    {
      $group: {
        _id: "$category_id",
        count: {
          $sum: 1,
        },
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "_id",
        foreignField: "_id",
        as: "category",
      },
    },
    {
      $unwind: "$category",
    },
    {
      $project: {
        _id: 1,
        name: "$category.name",
        count: 1,
      },
    },
  ]);
  res.json({
    totalUser,
    totalUserInMonth,
    totalBlogs,
    totalBlogsInMonth,
    totalComments,
    totalCommentsInMonth,
    map: [weekOne, weekTwo, weekThree, weekFour, weekFive, weekSix, weekSeven, weekEight].reverse(),
    category,
  });
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
  searchBlogsAndUsers,
  statistical,
};
