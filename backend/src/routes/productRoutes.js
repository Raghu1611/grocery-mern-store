const express = require("express");
const {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", protect, admin, addProduct);      // only admin
router.get("/", getProducts);
router.get("/:id", getProduct);
router.put("/:id", protect, admin, updateProduct);    // only admin
router.delete("/:id", protect, admin, deleteProduct); // only admin

module.exports = router;
  