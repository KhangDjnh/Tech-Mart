const Product = require('../models/product.js');

// Lấy tất cả sản phẩm
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Lấy sản phẩm theo ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Tạo sản phẩm mới
const createProduct = async (req, res) => {
    const product = new Product(req.body);
    try {
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Cập nhật sản phẩm
const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        );
        if (!updatedProduct) return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Xóa sản phẩm
const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
        res.json({ message: 'Đã xóa sản phẩm thành công' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
