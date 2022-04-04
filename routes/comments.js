const { postComment, updateComment, deleteComment } = require("../controllers/controller.comments");
const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/auth");

router
  .route("/")
  .post(verifyToken, postComment)
  .put(verifyToken, updateComment)
  .delete(verifyToken, deleteComment);

module.exports = router;
