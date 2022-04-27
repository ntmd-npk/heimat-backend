const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/auth");
const {
  register,
  logout,
  login,
  verifyRegister,
  refeshToken,
} = require("../controllers/controller.auth");

router.post("/register", register);
router.post("/verification", verifyRegister, login);
router.post("/login", login);
router.post("/logout", verifyToken, logout);
router.post("/refresh", refeshToken);

module.exports = router;
