const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/auth");
const { register, logout, login, verifyRegister } = require("../controllers/controller.auth");

router.post("/register", register);
router.post("/verification", verifyRegister);
router.post("/login", login);
router.post("/logout", verifyToken, logout);

module.exports = router;
