const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, default: null }, // null for Google users

  isVerified: { type: Boolean, default: false },

  // Google OAuth
  googleId: { type: String, default: null },
  avatar: { type: String, default: null }, // Google profile picture

  otp: { type: String, default: null },
  otpExpire: { type: Date, default: null }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);