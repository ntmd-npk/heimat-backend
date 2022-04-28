const asyncHandler = require("../middlewares/async");
const statusResponse = require("../utils/statusResponse");
const mongoose = require("mongoose");
const Comments = require("../models/comments");

const postComment = asyncHandler(async (req, res, next) => {
  const from_user_id = req._id;
  const { from_blog_id, content, created_date } = req.body;
  try {
    const comment = Comments({
      from_blog_id: mongoose.Types.ObjectId(from_blog_id),
      content,
      created_date: new Date(created_date),
      from_user_id: mongoose.Types.ObjectId(from_user_id),
    });
    const result = await comment.save();

    res.status(200).json({ ...statusResponse("200", "OK", "Successfully"), result });
  } catch {
    res
      .status(200)
      .json({ ...statusResponse("500", "Fail", "Couldn't get list comments for this blog") });
  }
});

const updateComment = asyncHandler(async (req, res, next) => {
  const id = req._id;
  const { content, comment_id } = req.body;
  try {
    const result = await Comments.updateOne(
      { from_user_id: mongoose.Types.ObjectId(id), _id: mongoose.Types.ObjectId(comment_id) },
      { content }
    );
    res.status(200).json({ ...statusResponse("200", "OK", "Successfully"), result });
  } catch (e) {
    res
      .status(200)
      .json({ ...statusResponse("500", "Fail", "Couldn't update comment for this blog") });
  }
});
const deleteComment = asyncHandler(async (req, res, next) => {
  const id = req._id;
  const { comment_id } = req.body;
  try {
    await Comments.findOneAndRemove({
      from_user_id: mongoose.Types.ObjectId(id),
      _id: mongoose.Types.ObjectId(comment_id),
    }).lean();
    res.status(200).json({ ...statusResponse(200, "OK", "Successfully") });
  } catch {
    res
      .status(200)
      .json({ ...statusResponse(200, "Fail", "Couldn't delete comment for this blog") });
  }
});
const getComment = asyncHandler(async (req, res, next) => {
  const { comment_id } = req.body;
  try {
    const result = await Comments.findOne({ _id: mongoose.Types.ObjectId(comment_id) }).lean();
    res.status(200).json({ ...statusResponse("200", "OK", "Successfully"), result });
  } catch (e) {
    res
      .status(200)
      .json({ ...statusResponse("500", "Fail", "Couldn't get comment for this blog") });
  }
});

const checkUpvote = asyncHandler(async (req, res, next) => {
  const user_id = req._id;
  const { comment_id } = req.body;
  const comment = await Comments.findOne({ _id: mongoose.Types.ObjectId(comment_id) });
  await comment.downvote.pull(mongoose.Types.ObjectId(user_id));
  const result = await comment.upvote.includes(mongoose.Types.ObjectId(user_id));
  if (result) {
    await comment.upvote.pull(mongoose.Types.ObjectId(user_id));
    await comment.save();
    res
      .status(200)
      .json({ ...statusResponse("200", "OK", "You disupvoted this comment"), result: comment });
  } else {
    req.comment = comment;
    next();
  }
});
const checkDownvote = asyncHandler(async (req, res, next) => {
  const user_id = req._id;
  const { comment_id } = req.body;
  const comment = await Comments.findOne({ _id: mongoose.Types.ObjectId(comment_id) });
  await comment.upvote.pull(mongoose.Types.ObjectId(user_id));
  const result = await comment.downvote.includes(mongoose.Types.ObjectId(user_id));
  if (result) {
    await comment.downvote.pull(mongoose.Types.ObjectId(user_id));
    await comment.save();
    res
      .status(200)
      .json({ ...statusResponse("200", "OK", "You disdownvoted this comment"), result: comment });
  } else {
    req.comment = comment;
    next();
  }
});

const upvoteComment = asyncHandler(async (req, res, next) => {
  const user_id = req._id;
  const comment = req.comment;
  await comment.upvote.push(mongoose.Types.ObjectId(user_id));
  await comment.save();
  res.status(200).json({ ...statusResponse("200", "OK", "Successfully"), result: comment });
});
const downvoteComment = asyncHandler(async (req, res, next) => {
  const user_id = req._id;
  const comment = req.comment;
  await comment.downvote.push(mongoose.Types.ObjectId(user_id));
  await comment.save();
  res.status(200).json({ ...statusResponse("200", "OK", "Successfully"), result: comment });
});

const getUserUpvote = asyncHandler(async (req, res, next) => {
  const { comment_id } = req.body;
  const comment = await Comments.findOne({ _id: mongoose.Types.ObjectId(comment_id) }).populate(
    "upvote",
    "fullname username avatar cover"
  );
  res.status(200).json({ ...statusResponse("200", "OK", "Successfully"), result: comment });
});

const getUserDownvote = asyncHandler(async (req, res, next) => {
  const { comment_id } = req.body;
  const comment = await Comments.findOne({ _id: mongoose.Types.ObjectId(comment_id) }).populate(
    "downvote",
    "fullname username avatar cover"
  );
  res.status(200).json({ ...statusResponse("200", "OK", "Successfully"), result: comment });
});

const getAllComment = asyncHandler(async (req, res, next) => {
  const result = await Comments.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "from_user_id",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $lookup: {
        from: "blogs",
        localField: "from_blog_id",
        foreignField: "_id",
        as: "blog",
      },
    },
    {
      $project: {
        blog: {
          _id: 1,
          title: 1,
        },
        "category.name": 1,
        user: {
          username: 1,
          fullname: 1,
          _id: 1,
        },
        title: 1,
        content: 1,
        created_date: 1,
        status: 1,
      },
    },
  ]);
  res.json({ result });
});

module.exports = {
  postComment,
  updateComment,
  deleteComment,
  upvoteComment,
  checkUpvote,
  checkDownvote,
  upvoteComment,
  downvoteComment,
  getUserDownvote,
  getUserUpvote,
  getAllComment,
};
