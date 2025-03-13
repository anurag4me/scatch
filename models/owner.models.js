const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
  contact: {
    type: String,
    validate: {
      validator: function (v) {
        return /^\d{10}$/.test(v); // Ensures exactly 10 digits
      },
      message: "Contact number must be 10 digits.",
    },
  },
  picture: {
    type: Buffer,
    default: 'default.png',
  },
  address: String,
  gstin: {
    type: String,
    // validate: {
    //   validator: function (v) {
    //     return /^[0-9A-Z]{15}$/.test(v); // Ensures 15-character alphanumeric GSTIN
    //   },
    //   message: "Invalid GSTIN format.",
    // },
  },
}, { timestamps: true });

ownerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("Owner", ownerSchema);
