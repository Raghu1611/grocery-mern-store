const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: "" },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0, min: 0, max: 100 }, // Percentage
  stock: { type: Number, default: 0 },
  unit: { type: String, default: "piece" }, // kg, g, piece, liter, etc.
  image: { type: String }, // url
  tags: [{ type: String }], // For search optimization
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  averageRating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
}, { timestamps: true });

// Add text index for search
productSchema.index({ name: "text", description: "text", tags: "text" });

module.exports = mongoose.model("Product", productSchema);
