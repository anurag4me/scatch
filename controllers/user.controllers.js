const UserModel = require("../models/user.models");
const { comparePassword, generateAuthToken } = require("../services/auth.services");

module.exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (await UserModel.findOne({ email })) {
    req.flash("error", "You already have an account, please login.");
    return res.redirect("/user");
  }

  const user = await UserModel.create({ name, email, password });

  const token = generateAuthToken(user._id);
  res.cookie("token", token);

  return res.status(201).redirect("/");
};

module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  if (!user) {
    req.flash("error", "Invalid email or password");
    return res.status(401).redirect("/user");
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    req.flash("error", "Invalid email or password");
    return res.status(401).redirect("/user");
  }

  const token = generateAuthToken(user._id);
  res.cookie("token", token);

  return res.status(200).redirect("/");
};

module.exports.logoutUser = (req, res) => {
  res.clearCookie("token");
  req.flash("success", "Logged out successfully");
  return res.status(200).redirect("/user");
};
