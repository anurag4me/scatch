const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET || "secretkey";

// ✅ Hash password (if needed outside model)
const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

// ✅ Compare passwords
const comparePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

// ✅ Generate JWT token
const generateAuthToken = (userId) => {
  return jwt.sign({ _id: userId }, SECRET_KEY, { expiresIn: "1h" });
};

module.exports = { hashPassword, comparePassword, generateAuthToken };
