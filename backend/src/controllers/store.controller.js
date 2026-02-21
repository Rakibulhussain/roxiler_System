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