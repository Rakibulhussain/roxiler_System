const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboard.contoller");
const { verifyToken, isAdmin } = require("../middleware/auth.middleware");

// Admin only
router.get(
  "/stats",
  verifyToken,
  isAdmin,
  dashboardController.getDashboardStats
);

module.exports = router;