const notifications = require("../models/notifications");
const statusResponse = require("../utils/statusResponse");
const asyncHandler = require("../middlewares/async");
const mongoose = require("mongoose");

const getNotification = asyncHandler(async (req, res, next) => {
  res.send("Choa đã cho bây dùng mô mà đòi có thông báo?");
});
const postNotification = asyncHandler(async (req, res, next) => {
  res.send("Choa đã cho bây dùng mô mà đòi có thông báo?");
});
const sendNotification = asyncHandler(async (req, res, next) => {
  res.send("Choa đã cho bây dùng mô mà đòi có thông báo?");
});
const deleteNotification = asyncHandler(async (req, res, next) => {
  res.send("Choa đã cho bây dùng mô mà đòi có thông báo?");
});

module.exports = {
  getNotification,
  postNotification,
  sendNotification,
  deleteNotification,
};
