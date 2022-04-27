const statusResponse = require("../utils/statusResponse");
const asyncHandler = require("../middlewares/async");
const categories = require("../models/categories");
const mongoose = require("mongoose");
const Blogs = require("../models/blogs");

const getCategories = asyncHandler(async (req, res, next) => {
  try {
    const result = await categories.find().lean();
    res.status(200).json({ categories: result });
  } catch {
    res.status(200).json({ ...statusResponse(500, "Fail", "Couldn't get categories data") });
  }
});
const addCategory = asyncHandler(async (req, res, next) => {
  let { name, description, created_date } = JSON.parse(req.body.category);
  created_date = new Date(created_date);
  const file = req.file;
  let cover;
  if (file) {
    cover = process.env.URL_FILE + file.filename;
  } else {
    res.status(200).json({ ...statusResponse(500, "Fail", "You didn't has field cover") });
  }
  if (!name) {
    res.status(200).json({ ...statusResponse(500, "Fail", "You didn't has field name") });
  }
  if (!description) {
    res.status(200).json({ ...statusResponse(500, "Fail", "You didn't has field description") });
  }
  if (!created_date) {
    res.status(200).json({ ...statusResponse(500, "Fail", "You didn't has field created date") });
  }
  try {
    const result = await categories.findOne({ name }).lean();
    if (result) {
      res.status(400).json({ ...statusResponse(500, "Fail", "This category existed") });
    } else {
      const cate = new categories({ name, description, cover, created_date });
      await cate.save();
      res.status(200).json({ ...statusResponse(200, "OK", "This category created") });
    }
  } catch {
    res.status(200).json({ ...statusResponse(500, "Fail", "Couldn't add this category") });
  }
});
const updateCategroy = asyncHandler(async (req, res, next) => {
  try {
    let { category_id, name, description, created_date } = JSON.parse(req.body.category);
    if (created_date) {
      created_date = new Date(created_date);
    }
    const file = req.file;
    let _id = mongoose.Types.ObjectId(category_id);
    let result;
    if (file) {
      let cover = process.env.URL_FILE + file.filename;
      result = await categories.updateOne({ _id }, { $set: { cover } }).lean();
    }
    if (name) {
      result = await categories.updateOne({ _id }, { $set: { name } }).lean();
    }
    if (description) {
      result = await categories.updateOne({ _id }, { $set: { description } }).lean();
    }
    if (created_date) {
      result = await categories.updateOne({ _id }, { $set: { created_date } }).lean();
    }
    res.status(200).json({ ...statusResponse(200, "OK", "This category updated"), ...result });
  } catch {
    res.status(200).json({ ...statusResponse(500, "Fail", "Couldn't update this category") });
  }
});
const deleteCategory = asyncHandler(async (req, res, next) => {
  try {
    const { category_id } = req.body;
    await categories.findOneAndRemove({ _id: mongoose.Types.ObjectId(category_id) });
    await Blogs.updateMany(
      { category_id: mongoose.Types.ObjectId(category_id) },
      { category_id: mongoose.Types.ObjectId("62617463a24d2c530ba9800f") }
    );
    res.status(200).json({ ...statusResponse(200, "OK", "This category deleted") });
  } catch {
    res.status(200).json({ ...statusResponse(500, "Fail", "Couldn't delete this category") });
  }
});

const rateCategory = asyncHandler(async (req, res, next) => {
  try {
    const result = await Blogs.aggregate([
      {
        $group: {
          _id: "$category_id",
          count: {
            $sum: 1,
          },
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "_id",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: "$category",
      },
      {
        $project: {
          _id: 1,
          "category.name": 1,
          "categoy.description": 1,
          "category.cover": 1,
          count: 1,
        },
      },
    ]);
    res.json(result);
  } catch (e) {
    res.json(e);
  }
});

module.exports = {
  getCategories,
  addCategory,
  updateCategroy,
  deleteCategory,
  rateCategory,
};
