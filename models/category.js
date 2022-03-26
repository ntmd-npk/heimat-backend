const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  _id: {
    type: mongoose.Schema.ObjectId,
  },
  name: {
    type: String,
  },
});
module.exports = {
  categorySchema,
  category: mongoose.model("category", categorySchema),
};
