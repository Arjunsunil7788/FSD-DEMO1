const mongoose = require("mongoose");

// ⚠️ VULNERABLE: password stored in plain text (A04 Cryptographic Failures)
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
