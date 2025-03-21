const express = require("express");
const UserRegisterRoutes = require("./routes/UserRegisterRoutes");
const connectDB = require('./db');
const otpRoutes = require("./routes/UserEmailRoutes");
const UserLogin = require("./routes/UserLoginRoutes");
const cors = require('cors');
const { verifyToken } = require('./JWT/JwtToken')
const AdminAddFuleDataRoutes = require('./routes/AdminAddFuleDataRoutes');
const AdminElectronicServiceRoutes = require('./routes/AdminElectronicServiceRoutes');

const port = 5000;
const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies
app.use(cors());

// Connect to MongoDB
connectDB(); // Call the function to connect to MongoDB

// user router
app.use("/api", otpRoutes);
app.use('/api/user', UserRegisterRoutes);
app.use('/user', UserLogin);


app.use("/AdminAdd", AdminAddFuleDataRoutes);
app.use("/AdminElectronice", AdminElectronicServiceRoutes);


app.use("/profile", verifyToken, (req, res) => {
   res.json({ message: "Protected Profile Data", user: req.user });
});



app.listen(port, () => {
   console.log(`server running on http://localhost:${port}`);
})


