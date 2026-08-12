const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const upload = require("../middlewares/upload");

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management endpoints
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: Returns a list of products
 */
router.get("/", productController.getProducts);
/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Returns a product
 *       404:
 *         description: Product not found
 */
router.get("/:id", productController.getProductById);

// Admin routes (In a real app, add verifyToken & checkAdmin middleware here)
router.post("/", upload.single("hinh_anh"), productController.createProduct);
router.put("/:id", upload.single("hinh_anh"), productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
