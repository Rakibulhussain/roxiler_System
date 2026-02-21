const express = require("express");
const router = express.Router();

const ratingController = require("../controllers/rating.controller");
const { verifyToken, isUser } = require("../middleware/auth.middleware");

// ⭐ Only USER role can rate
router.post(
  "/rate",
  verifyToken,
  isUser,
  ratingController.addOrUpdateRating
);

// Public route (everyone can see average)
router.get(
  "/average/:storeId",
  ratingController.getStoreAverageRating
);

module.exports = router;