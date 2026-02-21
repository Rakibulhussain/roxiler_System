const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

// Verify JWT Token
exports.verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    

    req.user = user; // attach user to request

    next();

  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};


exports.isAdmin = (req, res, next) => {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};
exports.isOwner = (req, res, next) => {
  if (req.user.role !== "OWNER") {
    return res.status(403).json({ message: "Owner access only" });
  }
  next();
};

exports.isUser = (req, res, next) => {
  if (req.user.role !== "USER") {
    return res.status(403).json({
      message: "Only normal users can access this route",
    });
  }

  next();
};