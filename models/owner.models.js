const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  products: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    default: [],
  },
  picture: {
    type: String,
    default: "default.png",
  },
  gstin: {
    type: String,
    validate: {
      validator: function (v) {
        return /^[0-9A-Z]{15}$/.test(v); // Ensures 15-character alphanumeric GSTIN
      },
      message: "Invalid GSTIN format.",
    },
  },
}, { timestamps: true });

module.exports = mongoose.model("Owner", ownerSchema);
