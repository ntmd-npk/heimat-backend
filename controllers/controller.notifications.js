const notifications = require("../models/notifications");
const statusResponse = require("../utils/statusResponse");
const asyncHandler = require("../middlewares/async");
const mongoose = require("mongoose");

const getNotification = asyncHandler(async (req, res, next) => {
  res.send("get");
});
const postNotification = asyncHandler(async (req, res, next) => {
  res.send("post");
});
const sendNotification = asyncHandler(async (req, res, next) => {
  res.send("send");
});
const deleteNotification = asyncHandler(async (req, res, next) => {
  res.send("delete");
});

module.exports = {
  getNotification,
  postNotification,
  sendNotification,
  deleteNotification,
};
