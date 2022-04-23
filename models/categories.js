const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
  },
  created_date: {
    type: Date,
  },
  description: {
    type: String,
  },
  cover: {
    type: String,
  },
});
module.exports = mongoose.model("categories", categorySchema);
