const express = require("express");
const router = express.Router();

const storeController = require("../controllers/store.controller");
const { verifyToken, isAdmin } = require("../middleware/auth.middleware");

// Admin can create store
router.post(
  "/create",
  verifyToken,
  isAdmin,
  storeController.createStore
);
router.get("/all",storeController.getAllStores)




module.exports = router;