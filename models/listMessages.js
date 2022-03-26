const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const Schema = mongoose.Schema;

const listMessagesSchema = new Schema({
  _id: {
    type: Number,
  },
  to: {
    type: String,
  },
  date: {
    type: String,
  },
  content: {
    type: String,
  },
});
listMessagesSchema.plugin(AutoIncrement, {});
module.exports = {
  listMessagesSchema,
  listMessages: mongoose.model("listMessages", listMessagesSchema),
};
