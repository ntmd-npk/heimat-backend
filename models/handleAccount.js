const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const handleAccountSchema = new Schema({
  user_id: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
    default: null,
  },
  code: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    minlength: [6, "Password requied at least 6 character"],
  },
  email: {
    type: String,
    lowercase: true,
    unique: [true, "User already exits"],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please add a valid email"],
  },
  created_date: {
    type: Date,
    required: true,
  },
  fullname: {
    type: String,
    default: "No name",
  },
  typeAccount: {
    type: String,
    enum: ["register", "delete"],
    default: "register",
  },
});
module.exports = mongoose.model("handleAcount", handleAccountSchema);
