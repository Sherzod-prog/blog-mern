const mongoose = require("mongoose");

const emailVerificationSchema = new mongoose.Schema({
  userId: String,
  token: String,
  createdAt: Date,
  expiresAt: Date,
});

module.exports = mongoose.model("EmailVerification", emailVerificationSchema);
