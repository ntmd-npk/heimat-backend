const express = require("express");
const multer = require("multer");
const { getProfile, updateProfile, deleteProfile } = require("../controllers/controller.users.js");
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
router
  .route("/profile")
  .put(verifyToken, upload.single("avatar"), updateProfile)
  .delete(deleteProfile);

module.exports = router;
