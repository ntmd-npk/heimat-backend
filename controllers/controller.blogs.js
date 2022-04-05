const asyncHandler = require("../middlewares/async");
const statusResponse = require("../utils/statusResponse");
const mongoose = require("mongoose");
const Blogs = require("../models/blogs");
const Comments = require("../models/comments");

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
          followers: 1,
          following: 1,
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
  // const { id } = req.params;
  // const testing = await Blogs.findOne({ _id: mongoose.Types.ObjectId(id) })
  //   .populate("user_id")
  //   .populate({
  //     path: "listComment",
  //     populate: { path: "listComment" },
  //   })
  //   .populate("category_id");
  // res.json(testing);
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
          category: {
            name: 1,
          },
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
    ]).exec();

    const listComments = await Comments.aggregate([
      {
        $match: {
          from_blog_id: mongoose.Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "from_user_id",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $project: {
          category: {
            name: 1,
          },
          author: {
            avatar: 1,
            cover: 1,
            username: 1,
            fullname: 1,
            description: 1,
            followers: 1,
            following: 1,
            _id: 1,
          },
          from_blog_id: 1,
          content: 1,
          create_date: 1,
          upvote: 1,
          downvote: 1,
          from_user_id: 1,
        },
      },
    ]);
    console.log("=============================================================");
    console.log(result);
    res.json({ result, listComments });
  } catch (e) {
    res.json({ e });
  }
});

const postBlog = asyncHandler(async function (req, res, next) {
  const user_id = req._id;
  var Blog = JSON.parse(req.body.blog);
  const file = req.file;
  if (file) {
    Blog.cover = process.env.URL_FILE + file.filename;
  }
  Blog.user_id = mongoose.Types.ObjectId(user_id);
  Blog.category_id = mongoose.Types.ObjectId(Blog.category_id);
  const blog = new Blogs({ ...Blog });
  const result = await blog.save();
  res.status(200).json({ ...statusResponse(200, "OK", "Successed"), result: { ...result._doc } });
  // try {
  //   const user_id = req._id;
  //   var Blog = JSON.parse(req.body.blog);
  //   const file = req.file;
  //   if (file) {
  //     Blog.cover = process.env.URL_FILE + file.filename;
  //   }
  //   Blog.user_id = mongoose.Types.ObjectId(user_id);
  //   Blog.category_id = mongoose.Types.ObjectId(Blog.category_id);
  //   const blog = new Blogs({ ...Blog });
  //   const result = await blog.save();
  //   res.status(200).json({ ...statusResponse(200, "OK", "Successed"), result: { ...result._doc } });
  // } catch {
  //   res.status(500).json({ ...statusResponse(500, "Fail", "Cant save your blogs") });
  // }
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
    var Blog = JSON.parse(req.body.blog);
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
      await Blogs.updateOne(
        {
          user_id: mongoose.Types.ObjectId(user_id),
          _id: mongoose.Types.ObjectId(id),
        },
        { $set: { content: Blog.content } }
      );
    if (Blog?.created_date != undefined)
      await Blogs.updateOne(
        {
          user_id: mongoose.Types.ObjectId(user_id),
          _id: mongoose.Types.ObjectId(id),
        },
        { $set: { created_date: Blog.created_date } }
      );
    if (Blog?.category_id != undefined)
      await Blogs.updateOne(
        {
          user_id: mongoose.Types.ObjectId(user_id),
          _id: mongoose.Types.ObjectId(id),
        },
        { $set: { category_id: Blog.category_id } }
      );
    if (Blog?.description != undefined)
      await Blogs.updateOne(
        {
          user_id: mongoose.Types.ObjectId(user_id),
          _id: mongoose.Types.ObjectId(id),
        },
        { $set: { description: Blog.description } }
      );
    if (file != undefined)
      await Blogs.updateOne(
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
const upvoteBlog = asyncHandler(async (req, res, next) => {
  const user_id = req._id;
  const { idBlog } = req.params;
  try {
    await Blogs.updateOne(
      { _id: mongoose.Types.ObjectId(idBlog) },
      { $pull: { downvote: user_id } }
    );
    res.status(200).json({ ...statusResponse(200, "OK", "Successfully") });
  } catch (e) {
    res.status(500).json({ ...statusResponse(500, "Fail", "Couldn't upvote blog") });
  }
});
const downvoteBlog = asyncHandler(async (req, res, next) => {
  const user_id = req._id;
  const { idBlog } = req.body;
  try {
    await Blogs.updateOne(
      { _id: mongoose.Types.ObjectId(idBlog) },
      { $push: { downvote: user_id } }
    );
    res.status(200).json({ ...statusResponse(200, "OK", "Successfully") });
  } catch (e) {
    res.status(500).json({ ...statusResponse(500, "Fail", "Couldn't downvote blog") });
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
  upvoteBlog,
  downvoteBlog,
};
