const express = require("express");
const multer = require("multer");
const {
  getUser,
  getAllUsers,
  getAllAdmins,
  removeAdmin,
  addNewAdmin,
  updateProfile,
} = require("../controllers/controller.users.js");
const { verifyToken, isAdmin } = require("../middlewares/auth");
const router = express.Router();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
var upload = multer({ storage: storage });

router.route("/profile").put(verifyToken, upload.single("avatar"), updateProfile);
router
  .route("/")
  .get(verifyToken, getUser)
  .delete(verifyToken, isAdmin, removeAdmin)
  .post(verifyToken, isAdmin, addNewAdmin);
router.route("/all-users").get(verifyToken, isAdmin, getAllUsers);
router.route("/all-admins").get(verifyToken, isAdmin, getAllAdmins);

module.exports = router;
