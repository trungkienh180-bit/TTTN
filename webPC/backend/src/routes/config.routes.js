const express = require("express");
const router = express.Router();
const configController = require("../controllers/config.controller");
const { verifyAdmin } = require("../middlewares/auth.middleware");

/**
 * @swagger
 * tags:
 *   name: Configs
 *   description: UI Configuration management
 */

/**
 * @swagger
 * /api/configs:
 *   get:
 *     summary: Get UI configs
 *     tags: [Configs]
 *     responses:
 *       200:
 *         description: Key-value pairs of configs
 */
router.get("/", configController.getConfigs);

// Admin route to update config
router.post("/", verifyAdmin, configController.updateConfig);

module.exports = router;
