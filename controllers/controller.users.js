const asyncHandler = require("../middlewares/async");
const Users = require("../models/users");
const mongoose = require("mongoose");

const getUser = asyncHandler(async (req, res, next) => {
  const id = req._id;
  try {
    const user = await Users.findOne({ _id: mongoose.Types.ObjectId(id) });
    res.status(200).json({ user });
  } catch {
    res.status(404).json({ fail: "Fail" });
  }
});

module.exports = {
  getUser,
};
