const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  from_user_id: {
    type: mongoose.Schema.ObjectId,
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

module.exports = {
  commentSchema,
  comment: mongoose.model("Comment", commentSchema),
};
