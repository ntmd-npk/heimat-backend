const asyncHandler = require("../middlewares/async");
const statusResponse = require("../utils/statusResponse");
const mongoose = require("mongoose");
const Blogs = require("../models/blogs");
const Comments = require("../models/comments");
const Users = require("../models/users");
const Reports = require("../models/report");

const reportUser = asyncHandler(async (req, res, next) => {
  try {
    const user_id = mongoose.Types.ObjectId(req._id);
    let { description, object_id, created_date } = req.body;
    object_id = mongoose.Types.ObjectId(object_id);
    const temp = await Users.findById(object_id).lean();
    if (!temp) {
      res.status(500).json({ result: "fail" });
    }
    const report = new Reports({
      user_id,
      description,
      created_date,
      content: {
        type: "user",
        object_id,
      },
    });
    await report.save();
    res.status(200).json({ result: "OK" });
  } catch (e) {
    res.status(500).json({ result: "fail" });
  }
});
const reportBlog = asyncHandler(async (req, res, next) => {
  try {
    const user_id = mongoose.Types.ObjectId(req._id);
    let { description, object_id, created_date } = req.body;
    object_id = mongoose.Types.ObjectId(object_id);
    const temp = await Blogs.findById(object_id);
    if (!temp) {
      res.status(500).json({ result: "fail nè" });
    }
    const report = new Reports({
      user_id,
      description,
      created_date,
      content: {
        type: "blog",
        object_id,
      },
    });
    await report.save();
    res.status(200).json({ result: "OK" });
  } catch (e) {
    res.status(500).json({ result: "fail" });
  }
});
const reportComment = asyncHandler(async (req, res, next) => {
  try {
    const user_id = mongoose.Types.ObjectId(req._id);
    let { description, object_id, created_date } = req.body;
    object_id = mongoose.Types.ObjectId(object_id);
    const temp = await Comments.findById(object_id);
    if (!temp) {
      res.json(temp);
      res.status(500).json({ result: "fail" });
    }
    const report = new Reports({
      user_id,
      description,
      created_date,
      content: {
        type: "comment",
        object_id,
      },
    });
    await report.save();
    res.status(200).json({ result: "OK" });
  } catch (e) {
    res.status(500).json({ result: "fail" });
  }
});

const listReportUsers = asyncHandler(async (req, res, next) => {
  const result = await Reports.aggregate([
    {
      $match: {
        "content.type": "user",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "user_id",
        foreignField: "_id",
        as: "reporter",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "content.object_id",
        foreignField: "_id",
        as: "object",
      },
    },
    {
      $project: {
        reporter: {
          _id: 1,
          username: 1,
          email: 1,
          avatar: 1,
          block: 1,
          created_date: 1,
        },
        object: {
          _id: 1,
          username: 1,
          email: 1,
          avatar: 1,
          block: 1,
          created_date: 1,
        },
        created_date: 1,
        description: 1,
      },
    },
  ]);
  res.json(result);
});

const listReportBlogs = asyncHandler(async (req, res, next) => {
  const result = await Reports.aggregate([
    {
      $match: {
        "content.type": "blog",
      },
    },
    {
      $lookup: {
        from: "blogs",
        localField: "content.object_id",
        foreignField: "_id",
        as: "object",
      },
    },
    {
      $unwind: {
        path: "$object",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "object.user_id",
        foreignField: "_id",
        as: "object.author",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "user_id",
        foreignField: "_id",
        as: "reporter",
      },
    },
    {
      $project: {
        reporter: {
          _id: 1,
          username: 1,
          email: 1,
          avatar: 1,
          block: 1,
          created_date: 1,
        },
        object: {
          _id: 1,
          author: {
            _id: 1,
            username: 1,
            email: 1,
            avatar: 1,
            created_date: 1,
          },
          title: 1,
          content: 1,
          status: 1,
          created_date: 1,
          category_id: 1,
        },
        created_date: 1,
        description: 1,
      },
    },
  ]);
  res.json(result);
});
const listReportComments = asyncHandler(async (req, res, next) => {
  const result = await Reports.aggregate([
    {
      $match: {
        "content.type": "comment",
      },
    },
    {
      $lookup: {
        from: "comments",
        localField: "content.object_id",
        foreignField: "_id",
        as: "object",
      },
    },
    {
      $unwind: {
        path: "$object",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "object.from_user_id",
        foreignField: "_id",
        as: "object.author",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "user_id",
        foreignField: "_id",
        as: "reporter",
      },
    },

    {
      $project: {
        reporter: {
          _id: 1,
          username: 1,
          email: 1,
          avatar: 1,
          block: 1,
          created_date: 1,
        },
        object: {
          author: {
            _id: 1,
            username: 1,
            email: 1,
            avatar: 1,
            created_date: 1,
          },
          _id: 1,
          from_user_id: 1,
          content: 1,
          status: 1,
          created_date: 1,
        },
        created_date: 1,
        description: 1,
      },
    },
  ]);
  res.json(result);
});
module.exports = {
  reportUser,
  reportBlog,
  reportComment,
  listReportUsers,
  listReportBlogs,
  listReportComments,
};
