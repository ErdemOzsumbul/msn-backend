const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  title: {
    type: String,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
  },
  type: {
    type: String,
  },
  source: {
    type: String,
  },
  lang: {
    type: String,
  },
  timestamp: {
    type: String,
  },
});

module.exports = mongoose.model("news", userSchema);
