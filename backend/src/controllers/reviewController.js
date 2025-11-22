const Review = require("../models/Review");
const Product = require("../models/Product");

// Get product reviews
exports.getProductReviews = async (req, res) => {
    try {
        const { productId } = req.params;

        const reviews = await Review.find({ product: productId })
            .populate("user", "name")
            .sort({ createdAt: -1 });

        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add review
exports.addReview = async (req, res) => {
    try {
        const { productId } = req.params;
        const { rating, comment, images } = req.body;

        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Check if user already reviewed this product
        const existingReview = await Review.findOne({
            user: req.user._id,
            product: productId
        });

        if (existingReview) {
            return res.status(400).json({ message: "You already reviewed this product" });
        }

        // Create review
        const review = await Review.create({
            user: req.user._id,
            product: productId,
            rating,
            comment,
            images: images || []
        });

        // Update product rating
        await updateProductRating(productId);

        const populatedReview = await Review.findById(review._id)
            .populate("user", "name");

        res.status(201).json(populatedReview);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update review
exports.updateReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const { rating, comment, images } = req.body;

        const review = await Review.findById(reviewId);

        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        // Check if review belongs to user
        if (review.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized to update this review" });
        }

        review.rating = rating || review.rating;
        review.comment = comment || review.comment;
        review.images = images || review.images;

        await review.save();

        // Update product rating
        await updateProductRating(review.product);

        const updatedReview = await Review.findById(reviewId)
            .populate("user", "name");

        res.json(updatedReview);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete review
exports.deleteReview = async (req, res) => {
    try {
        const { reviewId } = req.params;

        const review = await Review.findById(reviewId);

        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        // Check if review belongs to user or user is admin
        if (review.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
            return res.status(403).json({ message: "Not authorized to delete this review" });
        }

        const productId = review.product;
        await Review.findByIdAndDelete(reviewId);

        // Update product rating
        await updateProductRating(productId);

        res.json({ message: "Review deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Helper function to update product rating
async function updateProductRating(productId) {
    const reviews = await Review.find({ product: productId });

    if (reviews.length === 0) {
        await Product.findByIdAndUpdate(productId, {
            averageRating: 0,
            reviewCount: 0
        });
    } else {
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = totalRating / reviews.length;

        await Product.findByIdAndUpdate(productId, {
            averageRating: Number(averageRating.toFixed(1)),
            reviewCount: reviews.length
        });
    }
}
