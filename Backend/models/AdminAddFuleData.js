const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const fuledataSchema = new mongoose.Schema({
   id: {
      type: Number,
      unique: true
   },
   latitude: {
      type: Number,
      required: true
   },
   longitude: {
      type: Number,
      required: true
   },
   title: {
      type: String,
      required: true
   },
   address: {
      type: String,
      required: true
   },
   rating: {
      type: Number,
      required: true, // Fixed typo (requird → required)
      min: 0,
      max: 5
   },
   services: {
      type: [String],
      required: true,
      default: [],
   },
   fuelType: [
      {
         type: { type: String, required: true },
         price: { type: Number, required: true },
      }
   ],
   pumpdetails: {
      type: String,
   }
});

// Apply auto-increment to the `id` field
fuledataSchema.plugin(AutoIncrement, { inc_field: "id" });

const fuledata = mongoose.model("fuledata", fuledataSchema);

module.exports = fuledata;
