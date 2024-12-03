const productService = require("../Services/ProductService");
const imageService = require("../Services/ImageService");

exports.createProduct = async (req, res) => {
    try {
        const { id_tag, id_shop, name, description, realprice, discount, stock, rating } = req.body;
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
        const newProduct = await productService.createProduct({ id_tag, id_shop, name, description, realprice, discount, stock, images: uploadedImages, rating });
        res.status(201).json({ data: newProduct, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log(err.message); 
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
        const { id_tag, id_shop, name, description, realprice, discount, stock, rating } = req.body;

        // Kiểm tra sản phẩm tồn tại
        const product = await productService.getProductById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        
        const files = req.files;
        // Xử lý upload ảnh
        let uploadedImages = [];
        if (files && files.length > 0) {
            for (const file of files) {
               console.log(file.path); // TODO: Remove, for debug only
               uploadedImages.push(file.path); // Lưu thông tin các ảnh đã upload
            }
        }

        const updatedData = {
            id_tag,
            id_shop,
            name,
            description,
            realprice,
            discount,
            stock,
            images: uploadedImages,
            rating,
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
