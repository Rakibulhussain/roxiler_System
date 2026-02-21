const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Store = sequelize.define(
  "Store",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    store_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    address: {
      type: DataTypes.STRING(400),
      allowNull: false,
    },
  },
  {
    tableName: "stores",
    timestamps: true,
  }
);

module.exports = Store;