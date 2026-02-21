const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ================= REGISTER =================
exports.register = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let approvalStatus = true;

    // If registering as ADMIN → needs approval
    if (role === "ADMIN") {
      approvalStatus = false;
    }

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      address,
      role: role || "USER",
    });

    
    if (role === "ADMIN") {
      return res.status(201).json({
        message: "Admin registration successful. Waiting for approval.",
      });
    }

    res.status(201).json({
      message: "User registered successfully",
      user,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ================= LOGIN =================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }

    // 🔴 IMPORTANT: Block unapproved admins
    if (user.role === "ADMIN" && user.isApproved === false) {
      return res.status(403).json({
        message: "Admin account is waiting for approval"
      });
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ================= GET ALL USERS =================
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] }, // hide password
    });

    res.json(users);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
