const productService = require("../Services/ProductService");
const commentService = require("../Services/CommentService");

exports.createProduct = async (req, res) => {
    try {
        const { category, name, description, realprice, discount, stock, rating, brand } = req.body;
        //console.log(req.files); 
        const files = req.files;
        // Xử lý upload ảnh
        let uploadedImages = [];
        // if (req.files && req.files.length > 0) {
        //      for (const file of req.files) {
        //          const uploadedImage = await imageService.uploadImage(file.path);
        //          uploadedImages.push(uploadedImage); // Lưu thông tin các ảnh đã upload
        //      }
        //  }
        if (files && files.length > 0) {
            for (const file of files) {
               console.log(file.path); // TODO: Remove, for debug only
               uploadedImages.push(file.path); // Lưu thông tin các ảnh đã upload
            }
        }
        const newProduct = await productService.createProduct({ category, name, description, realprice, discount, stock, images: uploadedImages, rating, brand });
        res.status(201).json({ data: newProduct, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json({ data: product, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; 
        const limit = parseInt(req.query.limit) || 12;

        const products = await productService.getAllProducts(page, limit);
        res.status(200).json({ data: products, status: "success", page, limit });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { category, name, description, realprice, discount, stock, rating, brand } = req.body;

        // Kiểm tra sản phẩm tồn tại
        const product = await productService.getProductById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        
        const files = req.files;
        // Xử lý upload ảnh
        let uploadedImages = [];
        // Nếu có ảnh mới, upload chúng
        if (files && files.length > 0) {
            for (const file of files) {
                console.log(file.path); // Debug, xóa khi không cần
                uploadedImages.push(file.path); // Lưu đường dẫn ảnh mới đã upload
            }
        } else {
            // Nếu không có ảnh mới, giữ ảnh cũ từ sản phẩm hiện tại
            uploadedImages = product.images;  // Lấy ảnh cũ từ sản phẩm
        }


        const updatedData = {
            category,
            name,
            description,
            realprice,
            discount,
            stock,
            images: uploadedImages,
            rating,
            brand,
        };

        // Cập nhật sản phẩm
        const updatedProduct = await productService.updateProduct(req.params.id, updatedData);

        res.status(200).json({ data: updatedProduct, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.id);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Xóa sản phẩm mà không cần xóa ảnh
        const deletedProduct = await productService.deleteProduct(req.params.id);
        res.status(200).json({ data: deletedProduct, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.searchProducts = async (req, res) => {
    try {
        const keyword = req.query.keyword || ''; // Lấy từ khóa từ query string
        const products = await productService.searchProductsByKeyword(keyword);

        if (products.length === 0) {
            return res.status(404).json({ message: "Không tìm thấy sản phẩm", status: "fail" });
        }

        res.status(200).json({ data: products, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// exports.searchProductsByTagName = async (req, res) => {
//     try {
//         const tagName = req.query.keyword; 
//         const products = await productService.searchProductsByTagName(tagName);

//         if (products.length === 0) {
//             return res.status(404).json({ message: "Không tìm thấy sản phẩm nào", status: "fail" });
//         }

//         res.status(200).json({ data: products, status: "success" });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

exports.getProductWithComments = async (req, res) => {
    try {
        const { id_product } = req.params;

        // Lấy thông tin sản phẩm
        const product = await productService.getProductById(id_product);
        if (!product) {
            return res.status(404).json({ error: "Sản phẩm không tồn tại" });
        }

        // Lấy tất cả comment của sản phẩm
        const comments = await commentService.getCommentsByProductId(id_product);

        // Trả về cả sản phẩm và các comment
        res.status(200).json({ product, comments, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Cập nhật rating cho sản phẩm
exports.updateProductRating = async (req, res) => {
    try {
        const { id_product } = req.params;

        // Lấy tất cả comment của sản phẩm
        const comments = await commentService.getCommentsByProductId(id_product);

        if (comments.length === 0) {
            return res.status(404).json({ error: "Không có comment cho sản phẩm này" });
        }

        // Tính toán rating trung bình của sản phẩm
        const totalRating = comments.reduce((sum, comment) => sum + comment.rating, 0);
        const averageRating = totalRating / comments.length;

        // Cập nhật rating của sản phẩm
        const updatedProduct = await productService.updateProductRating(id_product, averageRating);

        res.status(200).json({ data: updatedProduct, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};