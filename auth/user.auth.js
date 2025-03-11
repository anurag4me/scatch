const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.models");

const authUser = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Login is required!" });
  }

  const data = jwt.verify(token, process.env.JWT_SECRET);
  const user = await UserModel.findById(data._id);

  if (!user) {
    return res.status(404).json({ message: "User not found!" });
  }
  req.user = user;
  next();
};

module.exports = authUser;
