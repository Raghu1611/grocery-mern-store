const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
    getProductReviews,
    addReview,
    updateReview,
    deleteReview,
} = require("../controllers/reviewController");

// Review routes
router.get("/products/:productId/reviews", getProductReviews);
router.post("/products/:productId/reviews", protect, addReview);
router.put("/reviews/:reviewId", protect, updateReview);
router.delete("/reviews/:reviewId", protect, deleteReview);

module.exports = router;
