const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { postSchema } = require("./post");
const postsUsers = new Schema({
  user_id: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
    required: true,
  },
  blogs: {
    type: [postSchema],
    required: true,
  },
});

module.exports = mongoose.model("postsUsers", postsUsers);
