const Store = require("../models/store.model");
const User = require("../models/user.model");
const Rating = require("../models/rating.model");
const { Sequelize } = require("sequelize");

exports.createStore = async (req, res) => {
  try {
    const { store_name, ownerId, address } = req.body;

    const owner = await User.findByPk(ownerId);

    if (!owner || owner.role !== "OWNER") {
      return res.status(400).json({
        message: "Owner not found or invalid role",
      });
    }

    const store = await Store.create({
      store_name,
      ownerId,
      address,
    });

    res.status(201).json({
      message: "Store created successfully",
      store,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.getAllStores = async (req, res) => {
  try {
    const stores = await Store.findAll({
      attributes: [
        "id",
        "store_name",
        "address",
        [
          Sequelize.fn("AVG", Sequelize.col("Ratings.rating")),
          "averageRating",
        ],
      ],
      include: [
        {
          model: User,
          as: "owner",
          attributes: ["name"],   // Owner name only
        },
        {
          model: Rating,
          attributes: [],  // Don't show all ratings
        },
      ],
      group: ["Store.id", "owner.id"],
    });

    res.status(200).json(stores);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};





exports.getAllStoresWithDetails = async (req, res) => {
  try {
    const stores = await Store.findAll({
      attributes: [
        "id",
        "store_name",  // ✅ fixed
        "address",
        [
          Sequelize.fn("AVG", Sequelize.col("Ratings.rating")),
          "avg_rating"
        ]
      ],
      include: [
        {
          model: User,
          as: "owner",   // ✅ must match association
          attributes: ["name", "email"]
        },
        {
          model: Rating,
          attributes: []
        }
      ],
      group: ["Store.id", "owner.id"]
    });

    return res.status(200).json({
      success: true,
      data: stores
    });

  } catch (error) {
    console.error("Error fetching stores:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch store details",
      error: error.message
    });
  }
};



exports.getStoreInfo = async (req, res) => {
  try {
    const { storeId } = req.params;

    // 🔹 Get store with owner info
    const store = await Store.findOne({
      where: { id: storeId },
      include: [
        {
          model: User,
          as: "owner",
          attributes: ["id", "name", "email"],
        },
      ],
    });

    if (!store) {
      return res.status(404).json({
        success: false,
        message: "Store not found",
      });
    }

    // 🔹 Calculate average rating
    const ratingStats = await Rating.findOne({
      attributes: [
        [Sequelize.fn("AVG", Sequelize.col("rating")), "averageRating"],
        [Sequelize.fn("COUNT", Sequelize.col("id")), "totalRatings"],
      ],
      where: { storeId },
      raw: true,
    });

    return res.status(200).json({
      success: true,
      store: {
        id: store.id,
        name: store.store_name,
        address: store.address,
        owner: store.owner,
        averageRating: ratingStats.averageRating
          ? Number(ratingStats.averageRating).toFixed(2)
          : "0.00",
        totalRatings: ratingStats.totalRatings || 0,
      },
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch store info",
      error: error.message,
    });
  }
};