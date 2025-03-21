const fuledata = require('../models/AdminAddFuleData')



const addfuledata = async (req, res) => {
   try {
      const { latitude, longitude, title, address, rating, services, fuelType, pumpdetails } = req.body;
      const data = new fuledata({ latitude, longitude, title, address, rating, services, fuelType, pumpdetails });
      await data.save();
      if (data) {
         return res.status(200).json({ message: 'done data insert', data: data })
      } else {
         return res.status(400).json({ message: 'error in your code', error: data })
      }
   } catch (error) {
      return res.status(401).json({ message: "server error", error: error })
   }
};


const getFuleData = async (req, res) => {
   try {
      console.log("API request received");
      const allfuledata = await fuledata.find();
      if (allfuledata.length > 0) {
         return res.status(200).json(allfuledata);
      } else {
         return res.status(404).json([]);
      }
   } catch (error) {
      console.error("Server Error:", error);
      return res.status(500).json({ message: 'server error', error: error });
   }
};

module.exports = { addfuledata, getFuleData }
