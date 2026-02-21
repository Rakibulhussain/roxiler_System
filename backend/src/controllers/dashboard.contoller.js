const User = require("../models/user.model");
const Store = require("../models/store.model");
const Rating = require("../models/rating.model");

exports.getDashboardStats = async (req, res) => {
  try {
    // Run all queries in parallel (faster)
    const [totalUsers, totalStores, totalRatings] = await Promise.all([
      User.count(),
      Store.count(),
      Rating.count()
    ]);

    return res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalStores,
        totalRatings
      }
    });

  } catch (error) {
    console.error("Dashboard Stats Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard statistics",
      error: error.message
    });
  }
};