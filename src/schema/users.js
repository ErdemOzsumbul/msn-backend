const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
  },
  surname: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  picture: {
    type: String,
  },
  password: {
    type: String,
  },
  province: {
    type: String,
  },
  district: {
    type: String,
  },
  googleId: {
    type: String,
  },
});

module.exports = mongoose.model("user", userSchema);
