const express = require("express");
const router = express.Router();
const {
  getListBlogsFromDateTime,
  removeAdmin,
  addNewAdmin,
} = require("../controllers/controller.managements");
const { verifyToken, isAdmin } = require("../middlewares/auth");

router.post("/blogs", verifyToken, isAdmin, getListBlogsFromDateTime);
router.delete("/admin", verifyToken, isAdmin, removeAdmin);
router.post("/admin", verifyToken, isAdmin, addNewAdmin);
module.exports = router;
