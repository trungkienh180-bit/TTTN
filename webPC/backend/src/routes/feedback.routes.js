const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedback.controller");
const { verifyAdmin } = require("../middlewares/auth.middleware");

// Public route for customers to submit feedback
router.post("/", feedbackController.createFeedback);

// Admin routes
router.get("/", verifyAdmin, feedbackController.getFeedbacks);
router.put("/:id", verifyAdmin, feedbackController.updateFeedbackStatus);
router.delete("/:id", verifyAdmin, feedbackController.deleteFeedback);

module.exports = router;
