const express = require("express");
const authUser = require("../middlewares/auth.middlewares");
const ProductModel = require("../models/product.models");
const UserModel = require("../models/user.models");

const router = express.Router();

router.get("/", authUser, async (req, res) => {
  const allProducts = await ProductModel.find();
  const error = req.flash("error");
  const success = req.flash("success");
  return res.render("shop", { products: allProducts, error, success });
});

router.get("/add-to-cart/:id", authUser, async (req, res) => {
  const product = await ProductModel.findById(req.params.id);
  const user = await UserModel.findById(req.user._id);
  user.cart.push(product._id);
  await user.save();
  req.flash("success", `${product.name} added to the cart successfully`);
  res.status(200).redirect("/");
});

module.exports = router;
