const statusResponse = require("../utils/statusResponse");
const asyncHandler = require("../middlewares/async");
const categories = require("../models/categories");
const mongoose = require("mongoose");
const getCategories = asyncHandler(async (req, res, next) => {
  try {
    const result = await categories.find();
    res.status(200).json({ categories: result });
  } catch {
    res.status(500).json({ ...statusResponse(500, "Fail", "Couldn't get categories data") });
  }
});
const addCategory = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  try {
    const result = await categories.findOne({ name });
    if (result) {
      res.status(400).json({ ...statusResponse(500, "Fail", "This category existed") });
    } else {
      const cate = new category({ name });
      await cate.save();
      res.status(200).json({ ...statusResponse(200, "OK", "This category created") });
    }
  } catch {
    res.status(500).json({ ...statusResponse(500, "Fail", "Couldn't add this category") });
  }
});
const updateCategroy = asyncHandler(async (req, res, next) => {
  try {
    const { category_id, name } = req.body;
    const result = await categories.updateOne(
      { _id: mongoose.Types.ObjectId(category_id) },
      { $set: { name } }
    );
    res.status(200).json({ ...statusResponse(200, "OK", "This category updated") });
  } catch {
    res.status(500).json({ ...statusResponse(500, "Fail", "Couldn't update this category") });
  }
});
const deleteCategory = asyncHandler(async (req, res, next) => {
  try {
    const { category_id } = req.body;
    await categories.findOneAndRemove({ _id: mongoose.Types.ObjectId(category_id) });
    res.status(200).json({ ...statusResponse(200, "OK", "This category deleted") });
  } catch {
    res.status(500).json({ ...statusResponse(500, "Fail", "Couldn't delete this category") });
  }
});

module.exports = {
  getCategories,
  addCategory,
  updateCategroy,
  deleteCategory,
};
