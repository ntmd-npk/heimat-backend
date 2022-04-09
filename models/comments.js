const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  from_blog_id: {
    type: mongoose.Schema.ObjectId,
    ref: "blogs",
    required: true,
  },
  from_user_id: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  create_date: {
    type: String,
    required: true,
  },
  upvote: {
    type: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "users",
      },
    ],
    default: [],
  },
  downvote: {
    type: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "users",
      },
    ],
    default: [],
  },
});

module.exports = mongoose.model("comments", commentSchema);
