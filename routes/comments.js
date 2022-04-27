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
  getAllComment,
} = require("../controllers/controller.comments");
const express = require("express");
const router = express.Router();
const { verifyToken, isAdmin } = require("../middlewares/auth");

router
  .route("/")
  .post(verifyToken, postComment)
  .put(verifyToken, updateComment)
  .delete(verifyToken, deleteComment);

router.post("/upvote", verifyToken, checkUpvote, upvoteComment);
router.post("/downvote", verifyToken, checkDownvote, downvoteComment);
router.post("/upvote/users", getUserUpvote);
router.post("/downvote/users", getUserDownvote);
router.get("/all", verifyToken, isAdmin, getAllComment);

module.exports = router;
