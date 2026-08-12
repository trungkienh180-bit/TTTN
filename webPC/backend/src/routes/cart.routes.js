const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

router.get("/", verifyToken, cartController.getCart);
router.post("/", verifyToken, cartController.addToCart);
router.delete("/:id", verifyToken, cartController.removeFromCart);
router.put("/:id", verifyToken, cartController.updateCartItem);
module.exports = router;
