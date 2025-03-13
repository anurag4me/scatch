const express = require("express");
const {
  registerOwner,
  loginOwner,
  logoutOwner,
} = require("../controllers/owner.controllers");

const router = express.Router();

router.get("/", (req, res) => {
  const message = { error: req.flash("error"), success: req.flash("success") };
  return res.render("owner-auth-page", message);
});

router.post("/register", registerOwner);

router.post("/login", loginOwner);

router.get("/logout", logoutOwner);

router.get("/admin", (req, res) => {
  const message = { error: req.flash("error"), success: req.flash("success") };
  return res.render("create-product", message);
});

module.exports = router;
