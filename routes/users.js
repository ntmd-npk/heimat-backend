const express = require("express");
const multer = require("multer");
const {
  getProfile,
  updateProfile,
  followers,
  unfollowers,
  listUserFollowing,
  listUserFollowers,
} = require("../controllers/controller.users.js");
const { verifyToken } = require("../middlewares/auth");
const router = express.Router();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, Math.random() + Date.now() + file.originalname);
  },
});

var upload = multer({ storage: storage });

router.route("/").get(verifyToken, getProfile);
router.route("/profile").put(verifyToken, upload.single("avatar"), updateProfile);

router.post("/follow", verifyToken, followers);
router.post("/unfollow", verifyToken, unfollowers);
router.post("/list-followings", verifyToken, listUserFollowing);
router.post("/list-followers", verifyToken, listUserFollowers);
module.exports = router;
