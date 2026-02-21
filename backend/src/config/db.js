const { Sequelize } = require("sequelize");
require("dotenv").config();

// Create Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME,   // Database name
  process.env.DB_USER,   // MySQL username
  process.env.DB_PASS,   // MySQL password
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false, // remove SQL logs in console
  }
);

// Test database connection
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL Database Connected Successfully");
  } catch (error) {
    console.error("❌ Database Connection Failed:", error.message);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
