const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/user.controllers");
const UserModel = require("../models/user.models");
const authUser = require("../middlewares/auth.middlewares");
const upload = require("../config/multer.config");
const { comparePassword } = require("../services/auth.services");

const router = express.Router();

router.get("/", (req, res) => {
  const message = { error: req.flash("error"), success: req.flash("success") };
  return res.render("user-auth-page", message);
});

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/logout", logoutUser);

router.get("/profile-details", authUser, (req, res) => {
  return res.render("profile-details", {
    error: req.flash("error"),
    success: req.flash("success"),
    user: req.user,
  });
});

router
  .route("/edit-profile")
  .get(authUser, (req, res) => {
    return res.render("edit-profile", {
      error: req.flash("error"),
      success: req.flash("success"),
      user: req.user,
    });
  })
  .post(authUser, upload.single("image"), async (req, res) => {
    try {
      const { name, email, contact, address } = req.body;
      await UserModel.findByIdAndUpdate(req.user._id, {
        name,
        email,
        contact,
        address,
        picture: req.file.buffer,
      });
      req.flash("success", "Your profile is now updated successfully");
    } catch (err) {
      req.flash("error", err.message);
    }
    res.status(200).redirect("/user/profile-details");
  });

router
  .route("/change-password")
  .get((req, res) => {
    const message = {
      error: req.flash("error"),
      success: req.flash("success"),
    };
    return res.render("change-password", message);
  })
  .post(authUser, async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const user = await UserModel.findById(req.user._id);
    const isMatch = comparePassword(oldPassword, user.password);
    if (!isMatch) {
      req.flash("error", "You have entered incorrect Old Password");
      res.redirect("/user/change-password");
    }
    user.password = newPassword;
    await user.save();
    req.flash("success", "Password changed successfully");
    res.status(200).redirect("/user/profile-details");
  });

module.exports = router;
