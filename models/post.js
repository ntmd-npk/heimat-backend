const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { commentSchema } = require("./comment");
const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  created_date: {
    type: String,
  },
  upvote: {
    type: Number,
    default: 0,
  },
  downvote: {
    type: Number,
    default: 0,
  },
  listComment: {
    type: [commentSchema],
    default: [],
  },
  category_id: {
    type: mongoose.Schema.ObjectId,
    default: null,
  },
  description: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    required: true,
  },
});

module.exports = {
  postSchema,
  postModel: mongoose.model("Posts", postSchema),
};
