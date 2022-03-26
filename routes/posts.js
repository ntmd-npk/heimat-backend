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
} = require("../controllers/controller.posts");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
var upload = multer({ storage: storage });

router.get("/all", getAllPostOfAllUsers);
router.get("/:idBlog", getBlog);
router.get("/", getAllBlogs);
router.post("/", verifyToken, upload.single("cover"), postBlog);
router
  .route("/:idBlog")
  .delete(verifyToken, deleteBlog)
  .put(verifyToken, upload.single("cover"), putBlog);
module.exports = router;
