const User = require("../models/user.model");

 
const bcrypt = require("bcryptjs");

// approve admin by id 
exports.approveAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "ADMIN") {
      return res.status(400).json({ message: "User is not an admin" });
    }
    

    user.isApproved = true;
    await user.save();

    res.json({ message: "Admin approved successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// create admin id and normal user
exports.createUserByAdmin = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;

    const allowedRoles = ["ADMIN", "USER", "OWNER"];

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role selected" });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Role-based approval logic
    let approvalStatus = false;

    if (role === "ADMIN") {
      approvalStatus = true;
    }

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      address,
      role,
      isApproved: approvalStatus,
    });

    res.status(201).json({
      message: "User created successfully by Admin",
      newUser,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

