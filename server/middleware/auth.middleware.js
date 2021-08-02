const jwt = require("jsonwebtoken");
const User = require("../model/auth.model");

exports.authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res.status(401).send({ message: "Please Login to access" });

  const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
  req.user = await User.findOne({ _id: decoded.id });
  next();
};

exports.userRole = async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ error: "not authorized as admin" });
  }
};
