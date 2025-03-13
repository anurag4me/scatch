const express = require("express");
const ProductModel = require("../models/product.models");
const upload = require("../config/multer.config");

const router = express.Router();

router.get("/", (req, res) => {
  return res.send("Welcome to product route");
});

router.post("/create", upload.single("image"), async (req, res) => {
  try {
    const { name, price, discount, bgColor, panelColor, textColor } = req.body;
    await ProductModel.create({
      name,
      price,
      discount,
      bgColor,
      panelColor,
      textColor,
      image: req.file.buffer,
    });
    req.flash("success", "Product Created Successfully.");
  } catch (err) {
    req.flash("error", err.message);
  }
  res.redirect("/owner/admin");
});

module.exports = router;
