const Store = require("../models/store.model");
const Rating = require("../models/rating.model");
const User = require("../models/user.model");
const { Sequelize } = require("sequelize");
const { sequelize } = require("../config/db"); 

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



// ⭐ 3️⃣ Get All Ratings for Owner's Store
exports.getMyStoreRatings = async (req, res) => {
  try {
    const ownerId = req.user.id;

    // Get owner's store
    const store = await Store.findOne({
      where: { ownerId },
    });

    if (!store) {
      return res.status(404).json({
        message: "Store not found for this owner",
      });
    } 
    // Get ratings for the store
    const ratings = await Rating.findAll({
      where: { storeId: store.id },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "email"],
        },
      ],
    });

    res.status(200).json({
      store: {
        id: store.id,
        store_name: store.store_name,
        address: store.address,
      },
      ratings,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getOwnerStores = async (req, res) => {
  try {
    const ownerId = req.user.id; // assuming auth middleware sets req.user

    const stores = await Store.findAll({
      where: { ownerId },

      attributes: [
        "id",
        "store_name",
        "address",

        // ⭐ Average rating calculation
        [
          sequelize.fn("AVG", sequelize.col("ratings.rating")),
          "averageRating",
        ],
      ],

      include: [
        {
          model: Rating,
          as: "ratings",
          attributes: ["id", "rating", "createdAt"],

          include: [
            {
              model: User,
              as: "user",
              attributes: ["id", "name", "email"], // who rated
            },
          ],
        },
      ],

      group: [
        "Store.id",
        "ratings.id",
        "ratings->user.id",
      ],
    });

    res.json({
      success: true,
      stores,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch owner stores",
    });
  }
};