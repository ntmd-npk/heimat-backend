const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/auth");
const multer = require("multer");
const {
  getAllBlogs,
  getBlog,
  postBlog,
  deleteBlog,
  putBlog,
  getAllPostOfAllUsers,
  getBlogsByCategory,
  upvoteBlog,
  downvoteBlog,
  blogForRecommend,
  blogsByMonth,
} = require("../controllers/controller.blogs");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
var upload = multer({ storage: storage });
router.get("/by-category", getBlogsByCategory);
router.get("/all", getAllPostOfAllUsers);
router.get("/:id", getBlog);
router.post("/upvote/:id", verifyToken, upvoteBlog);
router.post("/downvote/:id", verifyToken, downvoteBlog);
router.get("/", getAllBlogs);
router.post("/", verifyToken, upload.single("cover"), postBlog);
router
  .route("/:id")
  .delete(verifyToken, deleteBlog)
  .put(verifyToken, upload.single("cover"), putBlog);

router.post("/pagination", blogForRecommend);
router.post("/month", blogsByMonth);
module.exports = router;
