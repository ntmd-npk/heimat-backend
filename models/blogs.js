const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const blogSchema = new Schema({
  user_id: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
    required: true,
  },
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
    type: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "comments",
      },
    ],
    default: [],
  },
  category_id: {
    type: mongoose.Schema.ObjectId,
    ref: "categories",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    required: true,
    default: "https://dbk.vn/uploads/ckfinder/images/tranh-anh/Anh-troll-4.jpg",
  },
});

module.exports = mongoose.model("blogs", blogSchema);