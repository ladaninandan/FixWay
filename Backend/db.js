const mongoose = require("mongoose");
require("dotenv").config();

// MongoDB Connection
const connectDB = async () => {
   try {
      await mongoose.connect(process.env.MONGO_URI, {
         useNewUrlParser: true,        // ✅ No longer required in Mongoose 6+
         useUnifiedTopology: true      // ✅ No longer required in Mongoose 6+
      });
      console.log("✅ MongoDB Connected");
   } catch (error) {
      console.error("❌ MongoDB Connection Error:", error);
      process.exit(1); // Exit process with failure
   }
};

module.exports = connectDB;
