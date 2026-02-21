require("dotenv").config();
const app = require("./src/app");
const { sequelize, connectDB } = require("./src/config/db");

// Import models (VERY IMPORTANT)
require("./src/models/user.model");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    // ✅ DO NOT USE alter: true
    await sequelize.sync(); 

    console.log("All models synced");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Server start error:", error);
  }
};

startServer();