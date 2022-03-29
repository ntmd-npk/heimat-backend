const express = require("express");
const router = express.Router();
const { verifyToken, isAdmin } = require("../middlewares/auth");
const {
  getCategories,
  addCategory,
  updateCategroy,
  deleteCategory,
} = require("../controllers/controller.categories.js");

router
  .route("/")
  .get(getCategories)
  .post(verifyToken, isAdmin, addCategory)
  .put(verifyToken, isAdmin, updateCategroy)
  .delete(verifyToken, isAdmin, deleteCategory);

module.exports = router;
