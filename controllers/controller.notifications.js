const Notifications = require("../models/notifications");
const statusResponse = require("../utils/statusResponse");
const asyncHandler = require("../middlewares/async");
const mongoose = require("mongoose");

const getNotification = asyncHandler(async (req, res, next) => {
  const { notification_id } = req.body;
  try {
    const result = await Notifications.findOne({
      _id: mongoose.Types.ObjectId(notification_id),
    }).lean();
    res.status(200).json({ ...statusResponse("200", "OK", "Successfully"), result });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ ...statusResponse("500", "Fail", "Couldn't get your list notifications") });
  }
});

const readNotification = asyncHandler(async (req, res, next) => {
  const { notification_id } = req.body;
  try {
    const result = await Notifications.updateOne(
      {
        _id: mongoose.Types.ObjectId(notification_id),
      },
      { read: true }
    );
    res.status(200).json({ ...statusResponse("200", "OK", "Successfully"), result });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ ...statusResponse("500", "Fail", "Couldn't handle to read notifications") });
  }
});

const getAllNotification = asyncHandler(async (req, res, next) => {
  const user_id = req._id;
  try {
    const result = await Notifications.find({
      user_id: mongoose.Types.ObjectId(user_id),
    });
    res.status(200).json({ ...statusResponse("200", "OK", "Successfully"), result });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ ...statusResponse("500", "Fail", "Couldn't handle to read notifications") });
  }
});
const postNotification = asyncHandler(async (req, res, next) => {
  res.send("Choa đã cho bây dùng mô mà đòi có thông báo?");
});
const sendNotification = asyncHandler(async (req, res, next) => {
  res.send("Choa đã cho bây dùng mô mà đòi có thông báo?");
});
const deleteNotification = asyncHandler(async (req, res, next) => {
  const { notification_id } = req.body;
  try {
    const result = await Notifications.findOneAndRemove(
      {
        _id: mongoose.Types.ObjectId(notification_id),
      },
      { read: true }
    );
    res.status(200).json({ ...statusResponse("200", "OK", "Successfully"), result });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ ...statusResponse("500", "Fail", "Couldn't handle to delete notifications") });
  }
});

module.exports = {
  getNotification,
  getAllNotification,
  postNotification,
  sendNotification,
  deleteNotification,
};
