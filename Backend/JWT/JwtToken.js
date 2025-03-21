const jwt = require("jsonwebtoken");

// Generate JWT Token
exports.generateToken = (id) => {
   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '3h' });
};

// Verify JWT Token Middleware
exports.verifyToken = (req, res, next) => {
   const bearerHeader = req.headers['authorization'];

   if (!bearerHeader || !bearerHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token is missing or invalid" });
   }

   const token = bearerHeader.split(" ")[1]; // Extract token

   try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Store decoded token in req.user
      next();
   } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
   }
};
