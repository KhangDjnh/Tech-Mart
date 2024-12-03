const Product = require('../models/product');

exports.createProduct = async (product) => {
    const { id_tag, id_shop, name, description, realprice, discount = 0, stock, images, rating, brand } = product;
   
    const price = Math.ceil(realprice * (100 - discount) / 100); // Tính giá price làm tròn lên
    
    const newProduct = new Product({
        id_tag,
        id_shop,
        name,
        brand,
        description,
        realprice,
        discount,
        price, // Gán giá tính toán
        stock,
        images,
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

exports.updateProduct = async (id, productData) => {
    const { realprice, discount } = productData;
  
    // Nếu có realprice hoặc discount, tính lại price
    if (realprice !== undefined || discount !== undefined) {
      const existingProduct = await Product.findById(id);
  
      if (!existingProduct) {
        throw new Error("Product not found");
      }
  
      const updatedRealprice = realprice ?? existingProduct.realprice; // Lấy realprice mới hoặc giữ giá trị cũ
      const updatedDiscount = discount ?? existingProduct.discount; // Lấy discount mới hoặc giữ giá trị cũ
      productData.price = Math.ceil(updatedRealprice * (100 - updatedDiscount) / 100); // Tính lại price
    }
  
    return await Product.findByIdAndUpdate(id, productData, { new: true });
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
