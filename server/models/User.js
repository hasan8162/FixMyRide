const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Optional for Google Auth users
  googleId: { type: String }, // Optional for Local users
  // You can remove verificationToken entirely if you want, 
  // but setting isVerified to true by default handles local signups instantly:
  isVerified: { type: Boolean, default: true } 
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);