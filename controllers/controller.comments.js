const asyncHandler = require("../middlewares/async");
const statusResponse = require("../utils/statusResponse");
const mongoose = require("mongoose");
const Comments = require("../models/comments");

// const getCommentsOfOneBlog = asyncHandler(async (req, res, next) => {
//   const { from_blog_id } = req.body;
//   try {
//     const result = await Comments.find({ from_blog_id });
//     res.status(200).json({ ...statusResponse("200", "OK", "Successfully"), ...result });
//   } catch (e) {
//     console.log(e);
//     res
//       .status(500)
//       .json({ ...statusResponse("500", "Fail", "Couldn't get list comments for this blog") });
//   }
// });
const postComment = asyncHandler(async (req, res, next) => {
  const { from_blog_id, content } = req.body;
  try {
    const result = await Comments.find({ from_blog_id });
    res.status(200).json({ ...statusResponse("200", "OK", "Successfully"), ...result });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ ...statusResponse("500", "Fail", "Couldn't get list comments for this blog") });
  }
});

const updateComment = asyncHandler(async (req, res, next) => {
  const id = req._id;
  const { content, _id } = req.body;
  try {
    await Comments.updateOne({ from_user_id: id, _id }, { content });
    res.status(200).json({ result: "ok" });
  } catch (e) {
    res.status(500).json({ result: "loi roi" });
  }
});
const deleteComment = asyncHandler(async (req, res, next) => {
  const id = req._id;
  const { _id } = req.body;
  try {
    await Comments.findOneAndRemove({ from_user_id: id, _id });
    res.status(200).json({ result: "ok" });
  } catch {
    res.status(500).json({ result: "loi roi" });
  }
});
const getComment = asyncHandler(async (req, res, next) => {
  const _id = req.body;
  try {
    const result = await Comments.findOne({ _id });
    res.status(200).json({ result: "ok" });
  } catch (e) {
    res.status(500).json({ result: "loi roi" });
  }
});
