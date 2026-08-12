const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const { verifyAdmin, verifyToken } = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload");

router.get("/", verifyAdmin, userController.getUsers);
router.put("/:id/role", verifyAdmin, userController.updateUserRole);
router.delete("/:id", verifyAdmin, userController.deleteUser);

// Customer routes
router.get("/profile", verifyToken, userController.getProfile);
router.put(
  "/profile",
  verifyToken,
  upload.single("avatar"),
  userController.updateProfile,
);
router.put("/change-password", verifyToken, userController.changePassword);
router.get("/orders", verifyToken, userController.getMyOrders);

module.exports = router;
