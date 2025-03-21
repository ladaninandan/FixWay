const mongoose = require('mongoose');


const userRegisterSchema = new mongoose.Schema({
   email: {
      type: String,
      unique: true,
      // match: '/^[^\s@]+@[^\s@]+\.[^\s@]+$/',
      lowercase: true,
   },
   name: {
      type: String,
      required: true
   },
   password: {
      type: String,
      required: true,
      min: 8
   },
   conformPassword: {
      type: String,
      required: true,
      min: 8,
      unique: true
   },
   number: {
      type: Number,
      // required: true,
      min: 1000000000, // Minimum 10-digit mobile number
      max: 9999999999,  // Maximum 10-digit mobile number
      unique: true
   },
});

// password 
const UserRegister = mongoose.model('UserRegister', userRegisterSchema)

module.exports = UserRegister;