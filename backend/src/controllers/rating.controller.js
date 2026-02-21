const Rating = require("../models/rating.model");
const Store = require("../models/store.model");
const { Sequelize } = require("sequelize");


// ⭐ 1️⃣ Add or Update Rating
exports.addOrUpdateRating = async (req, res) => {
  try {
    const userId = req.user.id;   // from verifyToken middleware
    const { storeId, rating } = req.body;

    // Check rating range
    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        message: "Rating must be between 1 and 5",
      });
    }

    // Check store exists
    const store = await Store.findByPk(storeId);
    if (!store) {
      return res.status(404).json({
        message: "Store not found",
      });
    }

    // Check if rating already exists
    const existingRating = await Rating.findOne({
      where: { userId, storeId },
    });

    if (existingRating) {
      // Update rating
      existingRating.rating = rating;
      await existingRating.save();

      return res.status(200).json({
        message: "Rating updated successfully",
        existingRating,
      });
    }

    // Create new rating
    const newRating = await Rating.create({
      userId,
      storeId,
      rating,
    });

    res.status(201).json({
      message: "Rating submitted successfully",
      newRating,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



// ⭐ 2️⃣ Get Average Rating of Store
exports.getStoreAverageRating = async (req, res) => {
  try {
    const { storeId } = req.params;

    const result = await Rating.findAll({
      attributes: [
        [Sequelize.fn("AVG", Sequelize.col("rating")), "averageRating"],
        [Sequelize.fn("COUNT", Sequelize.col("id")), "totalRatings"],
      ],
      where: { storeId },
    });

    res.status(200).json(result[0]);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};