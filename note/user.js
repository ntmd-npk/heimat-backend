const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");
const { login, getPost, checkToken } = require("./user.controller");

router.post("/login", login);
router.post("/check-token", auth, checkToken);
router.get("/posts", auth, getPost);
module.exports = router;