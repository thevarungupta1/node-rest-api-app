const Product = require('../models/product.model');

// Get: All Products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            error: false,
            message: 'Products fetched successfully',
            data: products
        })
    } catch (err) {
        res.status(500).json({
            error: false,
            message: err.message
        })
    }
};

// Get: Simple Product by Id
exports.getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).json({
            error: true,
            message: 'Product not found'
        })
    }
    res.status(200).json({
        error: false,
        message: 'Product fetched successfully',
        data: product
    })
}

// Post: Create a new Product
exports.createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json({
            error: false,
            message: 'Product created successfully',
            data: product
        })
    } catch (err) {
        res.status(500).json({
            error: true,
            message: err.message
        })
    }
}

// Put: edit the product
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) {
            return res.status(404).json({
                error: true,
                message: 'Product not found'
            })
        }
        res.status(200).json({
            error: false,
            message: 'Product updated successfully',
            data: product
        })
    } catch (err) {
        res.status(500).json({
            error: true,
            message: err.message
        })
    }
}


// Delete: delete product by Id
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({
                error: true,
                message: 'Product not found'
            })
        }
        res.status(200).json({
            error: false,
            message: 'Product deleted successfully',
            data: product
        })
    } catch (err) {
        res.status(500).json({
            error: true,
            message: err.message
        })
    }
}