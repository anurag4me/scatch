const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/user.controllers");

const router = express.Router();

router.get("/", (req, res) => {
    return res.send("hey, welcome to user route");
});

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/logout", logoutUser);

module.exports = router;
