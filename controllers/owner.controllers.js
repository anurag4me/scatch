const OwnerModel = require("../models/owner.models");
const { comparePassword, generateAuthToken } = require("../services/auth.services");

module.exports.registerOwner = async (req, res) => {
  const { name, email, password, gstin } = req.body;

  if (await OwnerModel.findOne({ email })) {
    req.flash("error", "You already have an account, please login.");
    return res.redirect("/owner");
  }

  const user = await OwnerModel.create({ name, email, password, gstin });

  const token = generateAuthToken(user._id);
  res.cookie("token", token);

  return res.status(201).redirect("/");
};

module.exports.loginOwner = async (req, res) => {
  const { email, password } = req.body;

  const user = await OwnerModel.findOne({ email });

  if (!user) {
    req.flash("error", "Invalid email or password");
    return res.status(401).redirect("/owner");
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    req.flash("error", "Invalid email or password");
    return res.status(401).redirect("/owner");
  }

  const token = generateAuthToken(user._id);
  res.cookie("token", token);

  return res.status(200).redirect("/");
};

module.exports.logoutOwner = (req, res) => {
  res.clearCookie("token");
  req.flash("success", "Logged out successfully");
  return res.status(200).redirect("/owner");
};
