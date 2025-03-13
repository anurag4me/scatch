const express = require("express");
const authUser = require("../auth/user.auth");
const ProductModel = require("../models/product.models");

const router = express.Router();

router.get("/", (req, res) => {
  const message = { error: req.flash("error"), success: req.flash("success") };
  return res.render("index", message);
});

router.get("/shop", authUser, async (req, res) => {
  const allProducts = await ProductModel.find();
  return res.render("shop", { products: allProducts });
});

module.exports = router;
