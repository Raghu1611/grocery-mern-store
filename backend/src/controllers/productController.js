const Product = require("../models/Product");

// Add product
exports.addProduct = async (req, res) => {
  try {
    const { name, category, price, stock, image } = req.body;

    const product = await Product.create({
      name,
      category,
      price,
      stock,
      image
    });

    res.json({ message: "Product added", product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all products with search, filter, sort
exports.getProducts = async (req, res) => {
  try {
    const { search, category, minPrice, maxPrice, minRating, sort } = req.query;

    let query = { status: "active" };

    // Text search
    if (search) {
      query.$text = { $search: search };
    }

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Price range filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Rating filter
    if (minRating) {
      query.averageRating = { $gte: Number(minRating) };
    }

    // Sort options
    let sortOption = {};
    if (sort === "price-asc") sortOption.price = 1;
    else if (sort === "price-desc") sortOption.price = -1;
    else if (sort === "rating") sortOption.averageRating = -1;
    else if (sort === "newest") sortOption.createdAt = -1;
    else sortOption.createdAt = -1; // Default

    const products = await Product.find(query)
      .populate("category", "name image")
      .sort(sortOption);

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get one product
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category", "name description image");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ message: "Product updated", updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
