const productService = require("../Services/ProductService");
const imageService = require("../services/ImageService");

exports.createProduct = async (req, res) => {
    try {
        const { id_tag, id_shop, name, description, price, stock, images, rating } = req.body;
         // Xử lý upload ảnh
         let uploadedImages = [];
         if (req.files && req.files.length > 0) {
             for (const file of req.files) {
                 const uploadedImage = await imageService.uploadImage(file.path, 'TechMarket-Product');
                 uploadedImages.push(uploadedImage); // Lưu thông tin các ảnh đã upload
             }
         }
        const newProduct = await productService.createProduct({ id_tag, id_shop, name, description, price, stock, images: uploadedImages, rating });
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
        const products = await productService.getAllProducts();
        res.status(200).json({ data: products, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { id_tag, id_shop, name, description, price, stock, image, rating } = req.body;
        const product = await productService.getProductById(req.params.id);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Xử lý upload ảnh khi cập nhật
        let uploadedImages = product.images;
        if (req.files && req.files.length > 0) {
            uploadedImages = [];
            for (const file of req.files) {
                const uploadedImage = await imageService.uploadImage(file.path, 'TechMarket-Product');
                uploadedImages.push(uploadedImage); // Lưu thông tin các ảnh đã upload
            }
        }

        const updatedProduct = await productService.updateProduct(req.params.id, { id_tag, id_shop, name, description, price, stock, images: uploadedImages, rating });
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

        // Xóa các ảnh liên quan
        if (product.images && product.images.length > 0) {
            for (const imageUrl of product.images) {
                const publicId = extractPublicIdFromUrl(imageUrl); // Cần hàm để lấy publicId từ URL ảnh
                await imageService.deleteImage(publicId);
            }
        }

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

exports.searchProductsByTagName = async (req, res) => {
    try {
        const tagName = req.query.keyword; 
        const products = await productService.searchProductsByTagName(tagName);

        if (products.length === 0) {
            return res.status(404).json({ message: "Không tìm thấy sản phẩm nào", status: "fail" });
        }

        res.status(200).json({ data: products, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
