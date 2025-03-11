const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // Removes leading/trailing spaces
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true, // Ensures emails are stored in lowercase
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    cart: {
      type: [{ type: mongoose.Schema.Types.Mixed }],
      default: [],
    },
    orders: {
      type: [{ type: mongoose.Schema.Types.Mixed }],
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
      type: String,
      default: "default.png",
    },
  },
  { timestamps: true }
); // Adds createdAt and updatedAt fields

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password)
}

module.exports = mongoose.model("User", userSchema);
