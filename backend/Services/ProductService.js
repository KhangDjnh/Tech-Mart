const Product = require('../models/product');

exports.createProduct = async (product) => {
    const { id_tag, id_shop, name, description, price, stock, image, rating } = product;

    const newProduct = new Product({
        id_tag,
        id_shop,
        name,
        description,
        price,
        stock,
        image,
        rating
    });

    return await newProduct.save();
};

exports.getProductById = async (id) => {
    return await Product.findById(id); 
};

exports.getAllProducts = async () => {
    return await Product.find(); 
};

exports.updateProduct = async (id, product) => {
    return await Product.findByIdAndUpdate(id, product, { new: true });
};

exports.deleteProduct = async (id) => {
    return await Product.findByIdAndDelete(id);
};

exports.searchProductsByKeyword = async (keyword) => {
    return await Product.find({
        name: { $regex: keyword, $options: 'i' } // 'i' để không phân biệt hoa thường
    });
};

exports.searchProductsByTagName = async (tagName) => {
    const Tag = require("../models/tag"); // Model của Tag
    const tag = await Tag.findOne({ name: { $regex: tagName, $options: 'i' } }); // Tìm tag theo tên

    if (!tag) return []; // Nếu không tìm thấy tag, trả về mảng rỗng

    return await Product.find({ id_tag: tag._id }); // Tìm sản phẩm theo `id_tag`
};
