const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.models");
const OwnerModel = require("../models/owner.models");

const authUser = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    req.flash("error", "Login is required!");
    return res.status(401).redirect("/user");
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(data._id).select("-password");
    const owner = await OwnerModel.findById(data._id).select("-password");
    if(user) {
      req.user = user;
    } else {
      req.user = owner
    }
    next();
  } catch (error) {
    req.flash("error", "Something went wrong!");
    res.status(404).redirect("/user");
  }
};

module.exports = authUser;
