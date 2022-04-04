const asyncHandler = require("../middlewares/async");
const Users = require("../models/users");
const mongoose = require("mongoose");

const getUser = asyncHandler(async (req, res, next) => {
  const id = req._id;
  try {
    const user = await Users.findOne({ _id: mongoose.Types.ObjectId(id) }).lean();
    res.status(200).json({ user });
  } catch {
    res.status(404).json({ fail: "Fail" });
  }
});
const getAllUsers = asyncHandler(async (req, res, next) => {
  try {
    const users = await Users.find({ role: "user" }).lean();
    res.status(200).json({ ...statusResponse(200, "OK", "Successfully"), users });
  } catch {
    res.status(404).json({ ...statusResponse(500, "Fail", "Couldn't get list accounts user") });
  }
});
const getAllAdmins = asyncHandler(async (req, res, next) => {
  try {
    const users = await Users.find({ role: "admin" }).lean();
    res.status(200).json({ ...statusResponse(200, "OK", "Successfully"), users });
  } catch {
    res.status(404).json({ ...statusResponse(500, "Fail", "Couldn't get list accounts admin") });
  }
});
const addNewAdmin = asyncHandler(async (req, res, next) => {
  const { username, password, email, fullname } = req.body;
  try {
    const account = await Users.findOne({ $or: [{ username }, { email }] }).lean();
    if (account) {
      res.status(404).json({
        ...statusResponse(404, "Fail", "this account existed"),
      });
    }
    const user = new Users({
      username,
      password,
      email,
      fullname,
      role: "admin",
    });
    await user.save();
    res.status(200).json({ ...statusResponse(200, "OK", "Successfully"), user });
  } catch {
    res.status(500).json({ ...statusResponse(500, "Fail", "Couldn't add new account admin") });
  }
});
const removeNewAdmin = asyncHandler(async (req, res, next) => {
  const role = req.role;
  const user_id = req.body.admin_id;
  try {
    if (role == "admin") {
      await Users.findOneAndRemove({ _id: mongoose.Types.ObjectId(user_id) }).lean();
      res.status(200).json({ ...statusResponse(200, "OK", "Successfully") });
    } else {
      res.status(500).json({ ...statusResponse(500, "Fail", "Couldn't delete this account") });
    }
  } catch (e) {
    res.status(400).json({ ...statusResponse(400, "Fail", "Couldn't delete this account") });
  }
});
module.exports = {
  getUser,
  getAllUsers,
  getAllAdmins,
  addNewAdmin,
  removeNewAdmin,
};
