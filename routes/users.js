const express = require("express");
const { getUser } = require("../controllers/controller.users.js");
const { verifyToken } = require("../middlewares/auth");
const router = express.Router();

router.route("/").get(verifyToken, getUser);

module.exports = router;
