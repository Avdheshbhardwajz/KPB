import Product from '../models/Products.model.js';
import { uploadOnCloudinary, deletefromcloudinary } from '../utils/cloudinary.js';
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;
    const files = req.files;

    // Validate required fields
    if (!name || !description || !price || !category) {
      return res.status(400).json({ message: 'Please fill in all required fields.' });
    }

    // Upload each file to Cloudinary and extract the secure_url from the response
    const imageUploadPromises = files.map(file => uploadOnCloudinary(file.path));
    const uploadResults = await Promise.all(imageUploadPromises);
    const imageUrls = uploadResults.map(result => result.secure_url); // Extract only secure_url

    // Create new product
    const newProduct = await Product.create({
      name,
      description,
      price,
      category,
      images: imageUrls, // This is now an array of strings (URLs)
      stock,
    });

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product: newProduct
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
// @desc    Get all products
// @route   GET /api/products
// @access  Public
// @desc    Get all products
// @route   GET /api/products
// GET /api/products?page=1&limit=10&category=electronics&minPrice=100&maxPrice=1000

export const getAllProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = '-createdAt', category, minPrice, maxPrice } = req.query;

    // Build query object for filtering
    const query = {};

    if (category) {
      query.category = category; // Filter by category if provided
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = minPrice; // Filter products with price greater than or equal to minPrice
      if (maxPrice) query.price.$lte = maxPrice; // Filter products with price less than or equal to maxPrice
    }

    // Fetch products with pagination and filtering
    const products = await Product.find(query)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalProducts = await Product.countDocuments(query);

    res.status(200).json({
      success: true,
      total: totalProducts,
      page: Number(page),
      pages: Math.ceil(totalProducts / limit),
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};


// @desc    Get a single product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate('category');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private (Admin only)
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const files = req.files;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Delete old images from Cloudinary
    const deletePromises = product.images.map(url => deletefromcloudinary(url));
    await Promise.all(deletePromises);

    // Upload new images to Cloudinary
    const imageUploadPromises = files.map(file => uploadOnCloudinary(file.path));
    const imageResponses = await Promise.all(imageUploadPromises);

    // Extract only the URLs from the Cloudinary response
    const imageUrls = imageResponses.map(response => response.secure_url);

    updatedData.images = imageUrls; // Store only the URLs, not the entire response

    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      product: updatedProduct
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};


// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private (Admin only)
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the product in one go
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Delete all images from Cloudinary
    const deletePromises = product.images.map(url => deletefromcloudinary(url));
    await Promise.all(deletePromises);

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
