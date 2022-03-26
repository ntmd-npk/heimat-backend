let postsDB = require("../models/postsUsers");
let usersDB = require("../models/user");
const asyncHandler = require("../middlewares/async");
const statusResponse = require("../utils/statusResponse");
const mongoose = require("mongoose");
const { postModel } = require("../models/post");

const getAllBlogs = asyncHandler(async (req, res, next) => {
  const { user_id } = req.query;
  const result = await postsDB
    .aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $project: {
          user: {
            avatar: 1,
            cover: 1,
            username: 1,
            fullname: 1,
            description: 1,
          },
          blogs: 1,
          user_id: 1,
        },
      },
      {
        $match: {
          user_id: mongoose.Types.ObjectId(user_id),
        },
      },
    ])
    .exec();
  res.json({ result });
});

const getBlog = asyncHandler(async (req, res, next) => {
  const { user_id } = req.query;
  const { idBlog } = req.params;
  const result = await postsDB
    .aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $project: {
          user: {
            avatar: 1,
            cover: 1,
            username: 1,
            fullname: 1,
            description: 1,
          },
          blogs: 1,
          user_id: 1,
        },
      },
      {
        $match: {
          user_id: mongoose.Types.ObjectId(user_id),
          _id: mongoose.Types.ObjectId(idBlog),
        },
      },
    ])
    .exec();
  res.json({ result });
});

const postBlog = asyncHandler(async function (req, res, next) {
  try {
    var blog = JSON.parse(req.body.blog);
    //const { blog } = req.body;
    const user_id = req._id;
    console.log(user_id);
    const file = req?.file;
    blog.cover = blog.cover ? blog.cover : process.env.URL_FILE + file?.filename;
    const post = new postModel(blog);
    const PostDocument = await postsDB.findOne({ user_id: mongoose.Types.ObjectId(user_id) });
    if (!PostDocument) {
      const postsUsers = new postsDB({ user_id });
      postsUsers.blogs.push(post);
      await postsUsers.save();
    } else {
      await PostDocument.blogs.push(post);
      await PostDocument.save();
    }
    res.status(200).json({ ...statusResponse(200, "OK", "Successed"), blog: { ...blog } });
  } catch {
    res.status(500).json({ ...statusResponse(500, "Fail", "Cant save your posts") });
  }
});

const deleteBlog = asyncHandler(async (req, res, next) => {
  try {
    const user_id = req._id;
    const { idBlog } = req.params;
    await postsDB.update(
      { user_id: mongoose.Types.ObjectId(user_id) },
      { $pull: { blogs: { _id: mongoose.Types.ObjectId(idBlog) } } }
    );
    res.status(200).json(statusResponse(200, "OK", "Successed"));
  } catch {
    res.status(500).json(statusResponse(200, "Fail", "Error"));
  }
});
const putBlog = asyncHandler(async (req, res, next) => {
  const user_id = req._id;
  //var Blog = JSON.parse(req.body.blog);
  var Blog = req.body.blog;
  const { idBlog } = req.params;
  const file = req?.file;

  if (Blog?.title != undefined) {
    await postsDB.updateOne(
      {
        user_id: mongoose.Types.ObjectId(user_id),
        blogs: { $elemMatch: { _id: mongoose.Types.ObjectId(idBlog) } },
      },
      { $set: { "blogs.$.title": Blog.title } }
    );
  }

  if (Blog?.content != undefined)
    await postsDB.updateOne(
      {
        user_id: mongoose.Types.ObjectId(user_id),
        blogs: {
          $elemMatch: {
            _id: mongoose.Types.ObjectId(idBlog),
          },
        },
      },
      { $set: { "blogs.$.content": Blog.content } }
    );
  if (Blog?.created_date != undefined)
    await postsDB.updateOne(
      {
        user_id: mongoose.Types.ObjectId(user_id),
        blogs: { $elemMatch: { _id: mongoose.Types.ObjectId(idBlog) } },
      },
      { $set: { "blogs.$.created_date": Blog.created_date } }
    );
  if (Blog?.category_id != undefined)
    await postsDB.updateOne(
      {
        user_id: mongoose.Types.ObjectId(user_id),
        blogs: { $elemMatch: { _id: mongoose.Types.ObjectId(idBlog) } },
      },
      { $set: { "blogs.$.category_id": Blog.category_id } }
    );
  if (Blog?.description != undefined)
    await postsDB.updateOne(
      {
        user_id: mongoose.Types.ObjectId(user_id),
        blogs: { $elemMatch: { _id: mongoose.Types.ObjectId(idBlog) } },
      },
      { $set: { "blogs.$.description": Blog.description } }
    );
  if (file != undefined)
    await postsDB.updateOne(
      {
        user_id: mongoose.Types.ObjectId(user_id),
        "blogs._id": mongoose.Types.ObjectId(idBlog),
      },
      { $set: { "blogs.$.file": process.env.URL_FILE + file.filename } }
    );
  res.status(200).json({ ...statusResponse(200, "OK", "Successed") });
});

const getAllPostOfAllUsers = asyncHandler(async (req, res, next) => {
  const result = await postsDB
    .aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $project: {
          user: {
            avatar: 1,
            cover: 1,
            username: 1,
            fullname: 1,
            description: 1,
          },
          blogs: 1,
          user_id: 1,
        },
      },
    ])
    .exec();
  res.json({ result });
});
module.exports = {
  getAllBlogs,
  getBlog,
  postBlog,
  deleteBlog,
  putBlog,
  getAllPostOfAllUsers,
};
