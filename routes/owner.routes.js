const express = require("express");

const router = express.Router();

router.get("/admin", (req, res) => {
  const message = { error: req.flash("error"), success: req.flash("success") };
  return res.render("create-product", message);
});

module.exports = router;
