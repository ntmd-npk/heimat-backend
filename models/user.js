const mongoose = require("mongoose");
const { listMessagesSchema } = require("./listMessages");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "User name is requied"],
    unique: true,
  },
  password: {
    type: String,
    minlength: [6, "Password requied at least 6 character"],
    select: false,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    lowercase: true,
    unique: [true, "User already exits"],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please add a valid email"],
  },
  avatar: {
    type: String,
    default:
      "https://previews.123rf.com/images/ammentorp/ammentorp1608/ammentorp160800238/61075810-hombre-que-monta-la-motocicleta-con-una-mujer-en-el-camino-rural-pareja-joven-en-moto-a-trav%C3%A9s-de-la.jpg",
  },
  cover: {
    type: String,
    default:
      "https://previews.123rf.com/images/ammentorp/ammentorp1608/ammentorp160800238/61075810-hombre-que-monta-la-motocicleta-con-una-mujer-en-el-camino-rural-pareja-joven-en-moto-a-trav%C3%A9s-de-la.jpg",
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "none"],
    default: "none",
  },
  status: {
    type: String,
    default: null,
  },
  fullname: {
    type: String,
    required: true,
    default: "No name",
  },
  description: {
    type: String,
    default: null,
  },
  birthday: {
    type: String,
    default: null,
  },
  follow: [String],
  listMessages: {
    type: [listMessagesSchema],
    default: [
      {
        _id: 0,
      },
    ],
    select: false,
  },
});

module.exports = mongoose.model("Users", UserSchema);
