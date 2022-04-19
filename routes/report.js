const express = require("express");
const { verifyToken, isAdmin } = require("../middlewares/auth");
const router = express.Router();
const {
  reportUser,
  reportBlog,
  reportComment,
  listReportUsers,
  listReportBlogs,
  listReportComments,
} = require("../controllers/controller.report");

router.post("/user", verifyToken, reportUser);
router.post("/blog", verifyToken, reportBlog);
router.post("/comment", verifyToken, reportComment);
router.post("/list-users", verifyToken, isAdmin, listReportUsers);
router.post("/list-blogs", verifyToken, isAdmin, listReportBlogs);
router.post("/list-comments", verifyToken, isAdmin, listReportComments);

module.exports = router;
