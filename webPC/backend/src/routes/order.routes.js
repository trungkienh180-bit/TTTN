const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");
const {
  verifyToken,
  verifyAdmin,
  optionalAuth,
} = require("../middlewares/auth.middleware");

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management and payments
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     responses:
 *       201:
 *         description: Order created
 */
router.post("/", optionalAuth, orderController.createOrder);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: List of orders
 */
router.get("/", verifyToken, orderController.getUserOrders);
router.get("/all", verifyAdmin, orderController.getAllOrders);
router.put("/:id/status", verifyAdmin, orderController.updateOrderStatus);
router.post("/webhook", orderController.payosWebhook); // PayOS sẽ gọi vào đây không cần auth

module.exports = router;
