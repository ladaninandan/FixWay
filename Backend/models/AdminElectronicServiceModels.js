const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
   serviceType: {
      type: String,
      required: true
   }, // AC, TV, Mobile, etc.
   latitude: {
      type: Number,
      required: true
   },
   longitude: {
      type: Number,
      required: true
   },
   price: {
      type: Number,
      required: true
   },
   serviceName: {
      type: String,
      required: true
   },
   location: {
      type: String,
      required: true
   },
   contactNumber: {
      type: Number,
      required: true
   },
   workingHours: {
      type: String,
      required: true
   },
   loyaltyProgram: {
      type: String,
      required: true,
      default: "Free follow-up for alignment issues within 1 month"
   },
   amenities: {
      type: [String],
      required: true,
   }, // Array of strings
   services: {
      type: [String],
      required: true,
   }, // List of available services
   paymentMethods: {
      type: [String],
      // required: true,
   }, // Payment methods like Cash, Card, UPI
}, { timestamps: true });

const ElectronicService = mongoose.model("Service", serviceSchema);

module.exports = ElectronicService;
