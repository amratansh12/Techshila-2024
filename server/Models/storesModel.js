const mongoose = require("mongoose");
const validator = require("validator");

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      // [longitude, latitude]
      type: [Number],
      required: true,
    },
  },
});

storeSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("StoreModel", storeSchema);
