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

module.exports = router;
