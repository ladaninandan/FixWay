const UserRegister = require('../models/userRegisterSchema');
const otptable = require("../models/UserEmailSchema");

// Register Controller
const registerUser = async (req, res) => {
   try {
      const { name, password, conformPassword, number } = req.body;

      // Validate required fields
      if (!name || !password || !conformPassword || !number) {
         return res.status(400).json({ message: "All fields are required" });
      }

      // Check if passwords match
      if (password !== conformPassword) {
         return res.status(400).json({ message: "Password and Confirm Password do not match" });
      }

      //Fetch verified email from OTP table
      const otpData = await otptable.findOne().sort({ createdAt: -1 }); // Get the latest verified email
      if (!otpData) {
         return res.status(400).json({ message: "No verified email found. Please verify your email first." });
      }

      const email = otpData.email; // Automatically assign verified email

      //  Check if the user already exists
      const userExists = await UserRegister.findOne({ email });
      if (userExists) {
         return res.status(400).json({ message: "User already exists" });
      }

      //  Register new user with verified email
      const newUser = new UserRegister({ email, name, password, conformPassword, number });
      await newUser.save();


      //  Delete OTP entry after successful registration
      await otptable.deleteOne({ email });
      return res.status(200).json({ message: "User registered successfully with verified email" });


   } catch (error) {
      console.error("Error registering user:", error);
      return res.status(500).json({ message: "Server error", details: error.message });
   }
};

// show admin all user data 
const getregisteruser = async (req, res) => {
   try {
      const alluser = await UserRegister.find();
      console.log(alluser); // Optional: For debugging
      if (alluser.length === 0) {
         return res.status(404).json({ message: 'No users found', data: [] });
      }
      return res.status(200).json({ message: 'Done fetching users', data: alluser });
   } catch (error) {
      console.error("Error fetching user data:", error);
      return res.status(500).json({ message: 'Internal server error', error: error.message });
   }
};

// delete userinregoister data 

const deleteUser = async (req, res) => {
   try {
      const { id } = req.params;
      const user = await UserRegister.findByIdAndDelete(id);


      if (!user) {
         return res.status(401).json({ message: 'user not found' });
      }

      res.status(200).json({ message: 'user delete successfully' });
   } catch (error) {
      console.log('Error deleting user');
      res.status(400).json({ message: 'server error ' })

   }
}

module.exports = { registerUser, getregisteruser, deleteUser };
