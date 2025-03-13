const UserModel = require("../models/user.models");

module.exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (await UserModel.findOne({ email })) {
    req.flash("error", "You already have an account, please login.");
    return res.redirect("/");
  }

  const user = await UserModel.create({ name, email, password });

  const token = user.generateAuthToken();
  res.cookie("token", token);

  return res.status(201).redirect("/shop");
};

module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  if (!user) {
    req.flash("error", "Invalid email or password");
    return res.status(401).redirect("/");
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    req.flash("error", "Invalid email or password");
    return res.status(401).redirect("/shop");
  }

  const token = user.generateAuthToken();
  res.cookie("token", token);

  return res.status(200).redirect("/shop");
};

module.exports.logoutUser = (req, res) => {
  res.clearCookie("token");
  req.flash("success", "Logged out successfully");
  return res.status(200).redirect("/");
};
