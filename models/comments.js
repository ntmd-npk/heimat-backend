const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  from_blog_id: {
    type: mongoose.Schema.ObjectId,
    ref: "blogs",
  },
  from_user_id: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
  },
  content: {
    type: String,
  },
  create_date: {
    type: String,
  },
  upvote: {
    type: Number,
  },
  downvote: {
    type: Number,
  },
});

module.exports = mongoose.model("comments", commentSchema);