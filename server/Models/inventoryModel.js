const mongoose = require("mongoose");
const validator = require("validator");

const inventorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  store_id: {
    // store_id is a foreign key referencing the StoreModel
    type: mongoose.Schema.Types.ObjectId,
    ref: "StoreModel",
  },
});

module.exports = mongoose.model("inventoryModel", inventorySchema);
