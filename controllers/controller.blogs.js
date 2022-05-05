const asyncHandler = require("../middlewares/async");
const statusResponse = require("../utils/statusResponse");
const mongoose = require("mongoose");
const Blogs = require("../models/blogs");
const Comments = require("../models/comments");

const getBlogsByCategory = asyncHandler(async (req, res, next) => {
  const { category_id } = req.query;
  let temp;
  if (req?.role == "admin" || req._id) {
    temp = {
      category_id: mongoose.Types.ObjectId(category_id),
    };
  } else {
    temp = { category_id: mongoose.Types.ObjectId(category_id), status: "public" };
  }
  try {
    const result = await Blogs.aggregate([
      {
        $match: { ...temp },
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
          description: 1,
          created_date: 1,
          upvote: 1,
          downvote: 1,
          cover: 1,
        },
      },
    ]).exec();
    res.status(200).json({ result });
  } catch {
    res.status(200).json({ result: "Fail" });
  }
});

const getAllBlogs = asyncHandler(async (req, res, next) => {
  try {
    const { user_id } = req.query;
    let temp;
    if (req?.role == "admin" || req._id) {
      temp = {
        user_id: mongoose.Types.ObjectId(user_id),
      };
    } else {
      temp = { user_id: mongoose.Types.ObjectId(user_id), status: "public" };
    }
    const result = await Blogs.aggregate([
      {
        $match: {
          ...temp,
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
          description: 1,
          content: 1,
          created_date: 1,
          upvote: 1,
          downvote: 1,
          cover: 1,
        },
      },
    ]).exec();
    res.json({ result });
  } catch {
    res.status(200).json({ result: "Fail" });
  }
});

const getBlog = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    let temp;
    if (req?.role == "admin" || req._id) {
      temp = {
        _id: mongoose.Types.ObjectId(id),
      };
    } else {
      temp = { _id: mongoose.Types.ObjectId(id), status: "public" };
    }
    const result = await Blogs.aggregate([
      {
        $match: {
          ...temp,
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
          description: 1,
          status: 1,
          created_date: 1,
          upvote: 1,
          downvote: 1,
          cover: 1,
        },
      },
    ]).exec();
    if (result.length == 0) {
      console.log(result);
      res.status(200).json({
        ...statusResponse(
          404,
          "Fail",
          "This blog has been locked due to a violation of Heimat's policy and terms and usage or didn't exist."
        ),
      });
    }
    const listComments = await Comments.aggregate([
      {
        $match: {
          from_blog_id: mongoose.Types.ObjectId(id),
          status: "public",
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
          created_date: 1,
          upvote: 1,
          downvote: 1,
          from_user_id: 1,
        },
      },
    ]);
    res.json({ result, listComments });
  } catch {
    res.json({ result: "Fail" });
  }
});

const postBlog = asyncHandler(async function (req, res, next) {
  try {
    const user_id = req._id;
    var Blog = JSON.parse(req.body.blog);
    Blog.created_date = new Date(Blog.created_date);
    const file = req.file;
    if (file) {
      Blog.cover = process.env.URL_FILE + file.filename;
    }
    Blog.user_id = mongoose.Types.ObjectId(user_id);
    Blog.category_id = mongoose.Types.ObjectId(Blog.category_id);
    const blog = new Blogs({ ...Blog });
    const result = await blog.save();
    res.status(200).json({ ...statusResponse(200, "OK", "Successed"), result: { ...result._doc } });
  } catch {
    res.status(200).json({ ...statusResponse(500, "Fail", "Cant save your blogs") });
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
    await Comments.deleteMany({
      from_blog_id: mongoose.Types.ObjectId(id),
    });
    res.status(200).json(statusResponse(200, "OK", "Successed"));
  } catch {
    res.status(200).json(statusResponse(500, "Fail", "You can't delete this blog"));
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
        { $set: { created_date: new Date(Blog.created_date) } }
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
        { $set: { cover: process.env.URL_FILE + file.filename } }
      );
    res.status(200).json({ ...statusResponse(200, "OK", "Successed") });
  } catch {
    res.status(200).json({ ...statusResponse(500, "Fail", "Errored") });
  }
});

const getAllPostOfAllUsers = asyncHandler(async (req, res, next) => {
  let temp;
  if (req?.role == "admin" || req._id) {
    temp = {};
  } else {
    temp = {
      $match: {
        status: "public",
      },
    };
  }
  try {
    const result = await Blogs.aggregate([
      temp,
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
          description: 1,
          content: 1,
          created_date: 1,
          upvote: 1,
          downvote: 1,
          cover: 1,
          status: 1,
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
    res.status(200).json({ ...statusResponse(500, "Fail", "Couldn't get blogs of all users") });
  }
});

const checkUpvote = asyncHandler(async (req, res, next) => {
  const user_id = req._id;
  const { idBlog } = req.params;
  const Blog = await Blogs.findOne({ _id: mongoose.Types.ObjectId(idBlog) });
  await Blog.downvote.pull(mongoose.Types.ObjectId(user_id));
  const result = await Blog.upvote.includes(mongoose.Types.ObjectId(user_id));
  if (result) {
    await Blog.upvote.pull(mongoose.Types.ObjectId(user_id));
    await Blog.save();
    res
      .status(200)
      .json({ ...statusResponse("200", "OK", "You disupvoted this comment"), result: Blog });
  } else {
    req.Blog = Blog;
    next();
  }
});
const checkDownvote = asyncHandler(async (req, res, next) => {
  const user_id = req._id;
  const { idBlog } = req.params;
  const Blog = await Blogs.findOne({ _id: mongoose.Types.ObjectId(idBlog) });
  await Blog.upvote.pull(mongoose.Types.ObjectId(user_id));
  const result = await Blog.downvote.includes(mongoose.Types.ObjectId(user_id));
  if (result) {
    await Blog.downvote.pull(mongoose.Types.ObjectId(user_id));
    await Blog.save();
    res
      .status(200)
      .json({ ...statusResponse("200", "OK", "You disdownvoted this comment"), result: Blog });
  } else {
    req.Blog = Blog;
    next();
  }
});

const upvoteBlog = asyncHandler(async (req, res, next) => {
  const user_id = req._id;
  const Blog = req.Blog;
  await Blog.upvote.push(mongoose.Types.ObjectId(user_id));
  await Blog.save();
  res.status(200).json({ ...statusResponse("200", "OK", "Successfully"), result: Blog });
});
const downvoteBlog = asyncHandler(async (req, res, next) => {
  const user_id = req._id;
  const Blog = req.Blog;
  await Blog.downvote.push(mongoose.Types.ObjectId(user_id));
  await Blog.save();
  res.status(200).json({ ...statusResponse("200", "OK", "Successfully"), result: Blog });
});

const blogForRecommend = asyncHandler(async (req, res, next) => {
  const { pagination } = req.body;
  const result = await Blogs.countDocuments({ status: "public" });
  const LIMIT = 3;
  let blogs = {};
  blogs = await Blogs.aggregate([
    {
      $match: {
        status: "public",
      },
    },
    {
      $skip: pagination * LIMIT - LIMIT,
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
        description: 1,
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
    { $limit: LIMIT },
  ]);
  console.log(blogs);
  let temp = {
    totalPagination: Math.round(result / LIMIT),
    totalBlogs: result,
    pagination: pagination,
  };
  res.json({ blogs, pagination: temp });
});

const blogsByMonth = asyncHandler(async (req, res, next) => {
  const { start, end } = req.body;
  const result = await Blogs.aggregate([
    {
      $match: {
        created_date: {
          $gte: new Date(start),
          $lt: new Date(end),
        },
        status: "public",
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
    {
      $sort: {
        created_date: 1,
      },
    },
  ]);
  res.json({ result });
});
module.exports = {
  getBlog,
  putBlog,
  postBlog,
  deleteBlog,
  getAllBlogs,
  getBlogsByCategory,
  getAllPostOfAllUsers,
  checkUpvote,
  checkDownvote,
  upvoteBlog,
  downvoteBlog,
  blogForRecommend,
  blogsByMonth,
};
