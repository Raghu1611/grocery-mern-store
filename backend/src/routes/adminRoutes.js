const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");
const {
    getDashboardStats,
    getAllOrders,
    updateOrderStatus,
    getAllUsers,
    getOrderById,
} = require("../controllers/adminController");

// All routes require admin authentication
router.use(protect, admin);

// Dashboard
router.get("/dashboard", getDashboardStats);

// Orders management
router.get("/orders", getAllOrders);
router.get("/orders/:orderId", getOrderById);
router.put("/orders/:orderId/status", updateOrderStatus);

// Users management
router.get("/users", getAllUsers);

module.exports = router;
