const ElectronicService = require('../models/AdminElectronicServiceModels');


const addElectronicServiceData = async (req, res) => {
   try {

      const { serviceType, latitude, longitude, price, serviceName, location, contactNumber, workingHours, loyaltyProgram, amenities, services, paymentMethods } = req.body;

      const ElectronicData = new ElectronicService({ serviceType, latitude, longitude, price, serviceName, location, contactNumber, workingHours, loyaltyProgram, amenities, services, paymentMethods });

      await ElectronicData.save();

      if (ElectronicData) {
         return res.status(200).json({ message: 'done data insert', data: ElectronicData });
      } else {
         return res.status(400).json({ message: 'error in your code', error: ElectronicData });
      }
   } catch (error) {
      console.log("server Error ", error)
   }
}


const allGetElectronicServiceData = async (req, res) => {
   try {
      const { serviceType } = req.params;
      let query = {};
      if (serviceType) {
         query.serviceType = serviceType;
      }

      const allElectronicData = await ElectronicService.find(query);

      if (allElectronicData) {
         return res.status(200).json(allElectronicData);
      } else {
         return res.ststus(400).json({ message: "no service found for this type" });
      }
   } catch (error) {
      console.log("server Error ", error);
   }
}


module.exports = { addElectronicServiceData, allGetElectronicServiceData };