const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { verifyToken, isAdmin } = require("../middleware/auth.middleware");

router.post("/register", userController.register);
router.post("/login", userController.login);

router.get("/", userController.getAllUsers);


// ✅ FIXED
router.get(
  "/admin_normal_user",
  verifyToken,
  isAdmin,
  userController.getAdminAndNormalUsers
);
router.get(
  "/search",
  verifyToken,
  isAdmin,
  userController.searchUsers
);

// Get user by ID
router.get("/me", verifyToken, userController.getLoggedInUser);
// Update password
router.put("/change-password", verifyToken, userController.changeMyPassword);
module.exports = router;