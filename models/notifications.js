const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  user_id: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
  },
  content: {
    type: String,
  },
  created_date: {
    type: Date,
  },
  read: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("notifications", notificationSchema);
