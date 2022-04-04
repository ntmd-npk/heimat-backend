const asyncHandler = require("../middlewares/async");
const statusResponse = require("../utils/statusResponse");
const mongoose = require("mongoose");
const Comments = require("../models/comments");

const postComment = asyncHandler(async (req, res, next) => {
  const from_user_id = req._id;
  const { from_blog_id, content, create_date } = req.body;
  try {
    const comment = Comments({
      from_blog_id: mongoose.Types.ObjectId(from_blog_id),
      content,
      create_date,
      from_user_id: mongoose.Types.ObjectId(from_user_id),
    });
    const result = await comment.save();

    res.status(200).json({ ...statusResponse("200", "OK", "Successfully"), result });
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
    const result = await Comments.updateOne({ from_user_id: id, _id }, { content });
    res.status(200).json({ ...statusResponse("200", "OK", "Successfully"), result });
  } catch (e) {
    res
      .status(500)
      .json({ ...statusResponse("500", "Fail", "Couldn't update comment for this blog") });
  }
});
const deleteComment = asyncHandler(async (req, res, next) => {
  const id = req._id;
  const { _id } = req.body;
  try {
    await Comments.findOneAndRemove({ from_user_id: id, _id }).lean();
    res.status(200).json({ ...statusResponse("200", "OK", "Successfully") });
  } catch {
    res
      .status(500)
      .json({ ...statusResponse("500", "Fail", "Couldn't delete comment for this blog") });
  }
});
const getComment = asyncHandler(async (req, res, next) => {
  const _id = req.body;
  try {
    const result = await Comments.findOne({ _id }).lean();
    res.status(200).json({ ...statusResponse("200", "OK", "Successfully"), result });
  } catch (e) {
    res
      .status(500)
      .json({ ...statusResponse("500", "Fail", "Couldn't get comment for this blog") });
  }
});

module.exports = {
  postComment,
  updateComment,
  deleteComment,
};
