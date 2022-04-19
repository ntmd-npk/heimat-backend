const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ObjectSchema = new Schema({
  type: {
    type: String,
    enum: ["comment", "user", "blog"],
    required: true,
  },
  object_id: {
    type: mongoose.Schema.ObjectId,
    required: true,
    refPath: "type",
  },
});

const reportSchema = new Schema({
  user_id: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
    required: true,
  },
  created_date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    ref: "Users",
    required: true,
  },
  content: {
    type: ObjectSchema,
    required: true,
  },
});
module.exports = mongoose.model("reports", reportSchema);
