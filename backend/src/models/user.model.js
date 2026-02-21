const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        len: [3, 50] // Min 20, Max 60 characters
      },
    },

    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    address: {
      type: DataTypes.STRING(400),
      allowNull: true,
    },

    role: {
      type: DataTypes.ENUM("ADMIN", "USER", "OWNER"),
      defaultValue: "USER",
    },
    isApproved: {
  type: DataTypes.BOOLEAN,
  defaultValue: false,
}



  },
  {
    tableName: "users",
    timestamps: true, // createdAt & updatedAt
  }
);

module.exports = User;
