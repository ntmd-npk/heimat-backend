const asyncHandler = require("../middlewares/async");
const statusResponse = require("../utils/statusResponse");
const mongoose = require("mongoose");
const Blogs = require("../models/blogs");

const getBlogsByCategory = asyncHandler(async (req, res, next) => {
  const { category_id } = req.query;
  const result = await Blogs.aggregate([
    {
      $match: {
        category_id: mongoose.Types.ObjectId(category_id),
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
  ]).exec();
  res.status(200).json({ result });
});

const getAllBlogs = asyncHandler(async (req, res, next) => {
  const { user_id } = req.query;
  const result = await Blogs.aggregate([
    {
      $match: {
        user_id: mongoose.Types.ObjectId(user_id),
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
  ]).exec();
  res.json({ result });
});

const getBlog = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Blogs.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(id),
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
    ]).exec();
    console.log(result);
    res.json({ result });
  } catch {
    res.json({ result });
  }
});

const postBlog = asyncHandler(async function (req, res, next) {
  try {
    const user_id = req._id;
    const data = req.body.blog;
    data.user_id = mongoose.Types.ObjectId(user_id);
    data.category_id = mongoose.Types.ObjectId(data.category_id);
    const blog = new Blogs({ ...data });
    const result = await blog.save();
    res.status(200).json({ ...statusResponse(200, "OK", "Successed"), blog: { ...result._doc } });
  } catch {
    res.status(500).json({ ...statusResponse(500, "Fail", "Cant save your posts") });
  }
});

const deleteBlog = asyncHandler(async (req, res, next) => {
  try {
    const user_id = req._id;
    const { id } = req.params;
    await Blogs.findOneAndRemove({
      user_id: mongoose.Types.ObjectId(user_id),
      _id: mongoose.Types.ObjectId(id),
    });
    res.status(200).json(statusResponse(200, "OK", "Successed"));
  } catch {
    res.status(500).json(statusResponse(200, "Fail", "You can't delete this blog"));
  }
});
const putBlog = asyncHandler(async (req, res, next) => {
  try {
    const user_id = req._id;
    //var Blog = JSON.parse(req.body.blog);
    var Blog = req.body.blog;
    const { id } = req.params;
    const file = req?.file;

    if (Blog?.title != undefined) {
      await Blogs.updateOne(
        {
          user_id: mongoose.Types.ObjectId(user_id),
          _id: mongoose.Types.ObjectId(id),
        },
        { $set: { title: Blog.title } }
      );
    }
    if (Blog?.content != undefined)
      await postsDB.updateOne(
        {
          user_id: mongoose.Types.ObjectId(user_id),
          _id: mongoose.Types.ObjectId(id),
        },
        { $set: { content: Blog.content } }
      );
    if (Blog?.created_date != undefined)
      await postsDB.updateOne(
        {
          user_id: mongoose.Types.ObjectId(user_id),
          _id: mongoose.Types.ObjectId(id),
        },
        { $set: { created_date: Blog.created_date } }
      );
    if (Blog?.category_id != undefined)
      await postsDB.updateOne(
        {
          user_id: mongoose.Types.ObjectId(user_id),
          _id: mongoose.Types.ObjectId(id),
        },
        { $set: { category_id: Blog.category_id } }
      );
    if (Blog?.description != undefined)
      await postsDB.updateOne(
        {
          user_id: mongoose.Types.ObjectId(user_id),
          _id: mongoose.Types.ObjectId(id),
        },
        { $set: { description: Blog.description } }
      );
    if (file != undefined)
      await postsDB.updateOne(
        {
          user_id: mongoose.Types.ObjectId(user_id),
          _id: mongoose.Types.ObjectId(id),
        },
        { $set: { file: process.env.URL_FILE + file.filename } }
      );
    res.status(200).json({ ...statusResponse(200, "OK", "Successed") });
  } catch {
    res.status(500).json({ ...statusResponse(500, "Fail", "Errored") });
  }
});

const getAllPostOfAllUsers = asyncHandler(async (req, res, next) => {
  try {
    const result = await Blogs.aggregate([
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
      {
        $sort: {
          created_date: 1,
        },
      },
    ]).exec();
    res.json({ result });
  } catch {
    res.status(500).json({ ...statusResponse(500, "Fail", "Couldn't get blogs of all users") });
  }
});
module.exports = {
  getBlog,
  putBlog,
  postBlog,
  deleteBlog,
  getAllBlogs,
  getBlogsByCategory,
  getAllPostOfAllUsers,
};
