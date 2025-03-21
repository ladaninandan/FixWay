const OTP = require("../models/UserEmailSchema");
const UserRegister = require("../models/userRegisterSchema");
const transporter = require("../config/emailConfig");
const crypto = require("crypto");

// Send OTP
exports.sendOTP = async (req, res) => {
   try {
      const { email } = req.body;
      if (!email) return res.status(400).json({ error: "Email is required" });

      // Generate OTP
      const otp = crypto.randomInt(1000, 9999).toString();

      await OTP.findOneAndUpdate({ email }, { otp, createdAt: new Date() }, { upsert: true, new: true });

      const mailOptions = {
         from: process.env.EMAIL_USER,
         to: email,
         subject: "Your OTP Code",
         text: `Your OTP is: ${otp}. It expires in 5 minutes.`,
      };

      await transporter.sendMail(mailOptions);

      return res.status(200).json({ message: "OTP sent successfully!" });
      // res.status(500).json({ message: 'email add register' })

   } catch (error) {
      console.error("Error sending OTP:", error); // Log error for debugging
      res.status(500).json({ error: "Error sending OTP", details: error.message });
   }
};

// Verify OTP
exports.verifyOTP = async (req, res) => {
   try {
      const { email, otp } = req.body;
      if (!email || !otp) return res.status(400).json({ error: "Email and OTP are required" });

      // Find OTP record
      const record = await OTP.findOne({ email });

      if (!record) {
         return res.status(400).json({ error: "Invalid or expired OTP" });
      }

      // Check OTP expiration (5 minutes)
      const now = new Date();
      const otpAge = (now - record.createdAt) / 1000; // Convert ms to seconds
      if (otpAge > 300) {
         await OTP.deleteOne({ email });
         return res.status(400).json({ error: "OTP expired. Please request a new one." });
      }

      // Verify OTP
      if (record.otp.toString() !== otp.toString()) {
         return res.status(400).json({ error: "Invalid OTP" });
      }

      // ✅ Save Email to UserRegister Table (Only if not already registered)
      const existingUser = await UserRegister.findOne({ email });

      // if (!existingUser) {
      //    const newUser = new UserRegister({ email });
      //    await newUser.save();
      // }

      // ✅ Delete OTP after successful verification
      // await OTP.deleteOne({ email });
      return res.status(200).json({ message: "OTP verified successfully and Email registered!" });

   } catch (error) {
      console.error("Error verifying OTP:", error);
      res.status(500).json({ error: "Error verifying OTP", details: error.message });
   }
};
;
