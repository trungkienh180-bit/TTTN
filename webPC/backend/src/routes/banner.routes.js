const express = require("express");
const router = express.Router();
const bannerController = require("../controllers/banner.controller");
const { verifyAdmin } = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload");

router.get("/", bannerController.getBanners);
router.post(
  "/",
  verifyAdmin,
  upload.single("hinh_anh"),
  bannerController.createBanner,
);
router.delete("/:id", verifyAdmin, bannerController.deleteBanner);

module.exports = router;
