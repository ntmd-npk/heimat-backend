const express = require("express");
const { getUser, getAllUsers, getAllAdmins } = require("../controllers/controller.users.js");
const { verifyToken, isAdmin } = require("../middlewares/auth");
const router = express.Router();

router.route("/").get(verifyToken, getUser);
router.route("/all-users").post(verifyToken, isAdmin, getAllUsers);
router.route("/all-admins").post(verifyToken, isAdmin, getAllAdmins);

module.exports = router;
