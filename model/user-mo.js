const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: { type: String, required: false },
  passWord: { type: String, required: true },
  fullName: { type: String, required: false },
  phoneNumber: { type: String, required: false },
  email: { type: String, required: true },
  isAdmin: { type: Boolean, required: true },
});

module.exports = mongoose.model("user", userSchema);
