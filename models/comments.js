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
  status: {
    type: String,
    enum: ["public", "block"],
    default: "public",
  },
  content: {
    type: String,
    required: true,
  },
  created_date: {
    type: Date,
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
