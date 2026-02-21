const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");
const { verifyToken, isAdmin } = require("../middleware/auth.middleware");



// ✅ Admin can create user (ADMIN / USER / OWNER)
router.post(
  "/create-user",
  verifyToken,
  isAdmin,
  adminController.createUserByAdmin
);

// Approve admin
router.put(
  "/approve/:id",
  verifyToken,
  isAdmin,
  adminController.approveAdmin
);
module.exports = router;

