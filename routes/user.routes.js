const express = require("express");
const UserModel = require("../models/user.models");

const router = express.Router();

router.get("/", (req, res) => {
  return res.render("index");
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const user = await UserModel.create({ name, email, password });
  return res.status(201).json({ user });
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

  return res.status(200).redirect("/");
});

module.exports = router;
