const mongoose = require('mongoose');


const UserEmailSchema = new mongoose.Schema({
   email: {
      type: String,
      required: true,
      unique: true,
      trime: true,
      lowercase: true,
      match: '/^[^\s@]+@[^\s@]+\.[^\s@]+$/',
   },
   otp: {
      type: String, required: true
   },
   createdAt: {
      type: Date, default: Date.now, expires: 200
   }, // Expires in 5 minutes
});

const UserEmail = mongoose.model('UserEmail', UserEmailSchema);

module.exports = UserEmail;