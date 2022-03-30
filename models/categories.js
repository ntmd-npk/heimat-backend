const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
  },
});
module.exports = {
  categorySchema,
  categories: mongoose.model("categories", categorySchema),
};
