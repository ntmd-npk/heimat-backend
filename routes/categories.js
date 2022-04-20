const express = require("express");
const router = express.Router();
const { verifyToken, isAdmin } = require("../middlewares/auth");
const multer = require("multer");

const {
  getCategories,
  addCategory,
  updateCategroy,
  deleteCategory,
  rateCategory,
} = require("../controllers/controller.categories.js");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
var upload = multer({ storage: storage });
router
  .route("/")
  .get(getCategories)
  .post(verifyToken, isAdmin, upload.single("cover"), addCategory)
  .put(verifyToken, isAdmin, upload.single("cover"), updateCategroy)
  .delete(verifyToken, isAdmin, deleteCategory);

router.post("/rate", rateCategory);
module.exports = router;
