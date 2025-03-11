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
    type: String,
    required: true,
    trim: true, // Ensures no extra spaces in the URL
  },
  discount: {
    type: Number,
    default: 0,
    min: 0,
    max: 100, // Ensures discount percentage is valid
  },
  bgColor: {
    type: String,
    default: "#FFFFFF", // Default white background
  },
  panelColor: {
    type: String,
    default: "#F0F0F0", // Light gray default panel color
  },
  textColor: {
    type: String,
    default: "#000000", // Default black text color
  },
}, { timestamps: true }); // Adds createdAt and updatedAt fields

module.exports = mongoose.model("Product", productSchema);
