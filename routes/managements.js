const express = require("express");
const router = express.Router();
const {
  createAdmin,
  lockUser,
  listLockedUsers,
  unlockUser,
  lockBlog,
  listLockedBlogs,
  unlockBlog,
  lockComment,
  listLockedComments,
  unlockComment,
  searchBlogsAndUsers,
  statistical,
} = require("../controllers/controller.managements");

const { verifyToken, isAdmin } = require("../middlewares/auth");

router.post("/create-account-admin", verifyToken, isAdmin, createAdmin);

router.post("/lock-user", verifyToken, isAdmin, lockUser);
router.post("/list-locked-users", verifyToken, isAdmin, listLockedUsers);
router.post("/unlock-user", verifyToken, isAdmin, unlockUser);

router.post("/lock-blog", verifyToken, isAdmin, lockBlog);
router.post("/list-locked-blogs", verifyToken, isAdmin, listLockedBlogs);
router.post("/unlock-blog", verifyToken, isAdmin, unlockBlog);

router.post("/lock-comment", verifyToken, isAdmin, lockComment);
router.post("/list-locked-comments", verifyToken, isAdmin, listLockedComments);
router.post("/unlock-comment", verifyToken, isAdmin, unlockComment);
router.post("/search", searchBlogsAndUsers);
router.post("/statistical", statistical);
module.exports = router;
