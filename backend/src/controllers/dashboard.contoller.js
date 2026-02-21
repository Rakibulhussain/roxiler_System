const User = require("../models/user.model");
const Store = require("../models/store.model");

exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalStores = await Store.count();

    res.status(200).json({
      totalUsers,
      totalStores,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};