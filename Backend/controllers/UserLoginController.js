const UserRegister = require("../models/userRegisterSchema");
const { generateToken } = require("../JWT/JwtToken");


const Login = async (req, res) => {
   try {
      const { email, password } = req.body;

      // email and password required
      if (!email || !password) {
         return res.status(400).json({ message: 'email and password are required' })
      }

      // user not register plese register 
      const data = await UserRegister.findOne({ email });

      if (!data) {
         return res.status(400).json({ message: 'user not register please' })
      }


      // comper user email and register table store email
      if (email !== data.email) {
         return res.status(400).json({ messgae: "your email is Wrong correct email enater" })
      }

      // comper password user password and register table store password
      if (password !== data.password) {
         return res.status(400).json({ message: 'your password is wrong ' })
      }

      return res.status(200).json({ messgae: 'user login successful', _id: data.id, email: data.email, token: generateToken(data.id) })

   } catch (error) {
      console.log("error", error);
      return res.status(500).json({ message: "server error", details: error.messgae })
   }
}

module.exports = { Login }