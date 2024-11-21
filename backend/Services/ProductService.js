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
