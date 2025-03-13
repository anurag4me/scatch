const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, // Removes leading/trailing spaces
  },
  price: {
    type: Number,
    required: true,
    min: 0, // Ensures price cannot be negative
  },
  image: {
    type: Buffer,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
    min: 0,
    max: 100, // Ensures discount percentage is valid
  },
  bgColor: String,
  panelColor: String,
  textColor: String,
}, { timestamps: true }); // Adds createdAt and updatedAt fields

module.exports = mongoose.model("Product", productSchema);
