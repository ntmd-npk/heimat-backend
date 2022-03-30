const mongoose = require("mongoose");
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
    required: true,
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
    enum: ["Online", "Offline", "none"],
    default: "none",
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
  follows: {
    type: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "users",
      },
    ],
    default: [],
  },
});

module.exports = mongoose.model("users", UserSchema);
