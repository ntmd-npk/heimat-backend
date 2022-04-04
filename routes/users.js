const express = require("express");
const {
  getUser,
  getAllUsers,
  getAllAdmins,
  removeAdmin,
  addNewAdmin,
} = require("../controllers/controller.users.js");
const { verifyToken, isAdmin } = require("../middlewares/auth");
const router = express.Router();

router
  .route("/")
  .get(verifyToken, getUser)
  .delete(verifyToken, isAdmin, removeAdmin)
  .post(verifyToken, isAdmin, addNewAdmin);
router.route("/all-users").get(verifyToken, isAdmin, getAllUsers);
router.route("/all-admins").get(verifyToken, isAdmin, getAllAdmins);

module.exports = router;
