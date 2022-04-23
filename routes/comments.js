const {
  postComment,
  updateComment,
  deleteComment,
  checkUpvote,
  checkDownvote,
  upvoteComment,
  downvoteComment,
  getUserDownvote,
  getUserUpvote,
} = require("../controllers/controller.comments");
const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/auth");

router
  .route("/")
  .post(verifyToken, postComment)
  .put(verifyToken, updateComment)
  .delete(verifyToken, deleteComment);

router.post("/upvote", verifyToken, checkUpvote, upvoteComment);
router.post("/downvote", verifyToken, checkDownvote, downvoteComment);
router.post("/upvote/users", getUserUpvote);
router.post("/downvote/users", getUserDownvote);

module.exports = router;
