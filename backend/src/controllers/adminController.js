const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");

// Get dashboard statistics
exports.getDashboardStats = async (req, res) => {
    try {
        // Total orders
        const totalOrders = await Order.countDocuments();

        // Total revenue
        const revenueData = await Order.aggregate([
            { $match: { paymentStatus: "completed" } },
            { $group: { _id: null, total: { $sum: "$totalAmount" } } }
        ]);
        const totalRevenue = revenueData[0]?.total || 0;

        // Total products
        const totalProducts = await Product.countDocuments();

        // Total users
        const totalUsers = await User.countDocuments({ role: "user" });

        // Recent orders
        const recentOrders = await Order.find()
            .populate("user", "name email")
            .sort({ createdAt: -1 })
            .limit(10);

        // Low stock products
        const lowStockProducts = await Product.find({ stock: { $lt: 10 } })
            .populate("category", "name")
            .sort({ stock: 1 })
            .limit(10);

        res.json({
            totalOrders,
            totalRevenue,
            totalProducts,
            totalUsers,
            recentOrders,
            lowStockProducts
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all orders with filtering
exports.getAllOrders = async (req, res) => {
    try {
        const { status, startDate, endDate } = req.query;

        let query = {};

        if (status) {
            query.status = status;
        }

        if (startDate || endDate) {
            query.createdAt = {};
            if (startDate) query.createdAt.$gte = new Date(startDate);
            if (endDate) query.createdAt.$lte = new Date(endDate);
        }

        const orders = await Order.find(query)
            .populate("user", "name email phone")
            .sort({ createdAt: -1 });

        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        const validStatuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        order.status = status;

        if (status === "delivered") {
            order.deliveredAt = new Date();
            order.paymentStatus = "completed";
        }

        await order.save();

        // TODO: Send email notification to user about status change

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ role: "user" })
            .select("-password")
            .sort({ createdAt: -1 });

        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get order by ID (admin view)
exports.getOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await Order.findById(orderId)
            .populate("user", "name email phone")
            .populate("items.product", "name category");

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
