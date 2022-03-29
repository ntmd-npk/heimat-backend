const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const Schema = mongoose.Schema;

const messagesSchema = new Schema({
  _id: {
    type: Number,
  },
  from: { 
    type: mongoose.Schema.ObjectId, 
    ref: "users" 
  },
  to: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
  },
  date: {
    type: String,
  },
  content: {
    type: String,
  },
});
messagesSchema.plugin(AutoIncrement, {});
module.exports = mongoose.model("messages", messagesSchema);
