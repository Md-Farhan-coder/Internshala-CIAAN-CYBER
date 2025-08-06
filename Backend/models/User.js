const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: { type: String, unique: true },
  jobtilte: String,
  password: String, // Encrypted string
});

module.exports = mongoose.model("User", userSchema);
