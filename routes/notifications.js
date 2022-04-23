const express = require("express");
const router = express.Router();
const {
  getNotification,
  postNotification,
  sendNotification,
  deleteNotification,
} = require("../controllers/controller.notifications");
const { verifyToken, isAdmin } = require("../middlewares/auth");

router
  .route("/")
  .get(verifyToken, getNotification)
  .post(verifyToken, postNotification)
  .delete(verifyToken, deleteNotification);
router.post("/send", sendNotification);

module.exports = router;
