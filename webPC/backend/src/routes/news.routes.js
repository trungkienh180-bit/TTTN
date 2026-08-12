const express = require("express");
const router = express.Router();
const newsController = require("../controllers/news.controller");
const { verifyAdmin } = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload");
/**
 * @swagger
 * tags:
 *   name: News
 *   description: News and blog management
 */

/**
 * @swagger
 * /api/news:
 *   get:
 *     summary: Get all news articles
 *     tags: [News]
 *     responses:
 *       200:
 *         description: List of news
 */
router.get("/", newsController.getNews);
router.get("/:id", newsController.getNewsById);
router.post(
  "/",
  verifyAdmin,
  upload.single("hinh_anh"),
  newsController.createNews,
);
router.put(
  "/:id",
  verifyAdmin,
  upload.single("hinh_anh"),
  newsController.updateNews,
);
router.delete("/:id", verifyAdmin, newsController.deleteNews);

module.exports = router;
