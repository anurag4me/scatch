const express = require("express");
const UserModel = require("../models/user.models");
const authUser = require("../auth/user.auth")

const router = express.Router();

router.get("/", (req, res) => {
  return res.render("index");
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const user = await UserModel.create({ name, email, password });

  const token = user.generateAuthToken();
  res.cookie("token", token)

  return res.status(201).json({ token, user });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = user.generateAuthToken();
  res.cookie("token", token)

  return res.status(200).redirect("/");
});

module.exports = router;
