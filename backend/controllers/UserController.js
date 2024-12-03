const userService = require("../Services/UserService");
const imageService = require("../Services/ImageService");
const User = require('../models/user');
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
  const { username, email, password, phonenumber, address, gender, birthday, role } = req.body;

  try {
    if (!req.body || !req.body.email) {
      throw new Error("Email is required.");
    }

    console.log(req.files);

    // Kiểm tra và đặt ảnh avatar mặc định nếu không có
    if (!req.files || !req.files.profilePic) {
      req.body.profilePic = "https://res.cloudinary.com/djhnuocm0/image/upload/v1732809983/TechMarket-User/default_user.jpg";
    } else {
      req.body.profilePic = req.files.profilePic[0].path; 
    }

    // Kiểm tra và đặt ảnh cover mặc định nếu không có
    if (!req.files || !req.files.coverPic) {
      req.body.coverPic = "https://res.cloudinary.com/djhnuocm0/image/upload/v1732810068/TechMarket-User-Cover/default_cover.png"; // Đường dẫn tới ảnh cover mặc định
    } else {
      req.body.coverPic = req.files.coverPic[0].path;  // Lấy URL ảnh từ file tải lên
    }

    req.body.cart = req.body.cart || [];

    const user = await userService.createUser(req.body);
    res.status(200).json({ data: user, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.json({ data: user, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json({ data: users, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { username, email, password, phonenumber, address, gender, birthday, role, id_shop, cart } = req.body;

    let user = await userService.getUserById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    console.log(req.files); // In ra thông tin các file đã tải lên

    // Xử lý hình ảnh nếu có
    if (req.files && req.files.profilePic) {
      req.body.profilePic = req.files.profilePic[0].path;  // Lấy URL ảnh từ file tải lên
    }

    if (req.files && req.files.coverPic) {
      req.body.coverPic = req.files.coverPic[0].path;  // Lấy URL ảnh từ file tải lên
    }

    // Hash mật khẩu nếu có cập nhật
    if (password && password !== user.password) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      req.body.password = hashPassword;
    }

    if (id_shop) {
      // Kiểm tra nếu id_shop chưa có trong mảng id_following
      if (!user.id_following.includes(id_shop)) {
        user.id_following.push(id_shop); // Thêm id_shop vào mảng nếu chưa có
      } else {
        // Nếu id_shop đã có trong mảng, loại bỏ nó khỏi mảng
        user.id_following = user.id_following.filter(shopId => shopId.toString() !== id_shop);
      }
    }

    // Xử lý cart
    if (cart && Array.isArray(cart)) {
      req.body.cart = await userService.updateCart(user.cart, cart);
    }

    // Cập nhật thông tin người dùng vào cơ sở dữ liệu
    const updatedUser = await userService.updateUser(req.params.id, req.body, { new: true });

    res.status(200).json({ data: updatedUser, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.profilePic && user.profilePic.public_id) {
      const deleteResponse = await imageService.deleteImage(user.profilePic.public_id);
      if (!deleteResponse.result === "ok") {
        throw new Error("Failed to delete image from Cloudinary");
      }
    }

    if (user.coverPic && user.coverPic.public_id) {
      const deleteCoverResponse = await imageService.deleteImage(user.coverPic.public_id);
      if (!deleteCoverResponse.result === "ok") {
        throw new Error("Failed to delete cover image from Cloudinary");
      }
    }

    const deletedUser = await userService.deleteUser(req.params.id);
    res.status(200).json({ data: deletedUser, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUserCart = async (req, res) => {
  try {
    let user = await userService.getUserById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { cart } = req.body;

    if (!cart || !Array.isArray(cart)) {
      return res.status(400).json({ error: "Cart must be a valid array." });
    }

    // Cập nhật cart của user
    req.body.cart = await userService.updateCart(user.cart, cart);

    // Lưu lại thay đổi
    user.cart = req.body.cart;
    const updatedUser = await user.save();

    // Trả về phản hồi
    res.status(200).json({ data: user.cart, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createAdminUser = async () => {
  try {
    // Kiểm tra xem đã có người dùng admin chưa
    const adminUser = await User.findOne({ username: 'admin' });

    if (!adminUser) {
      // Nếu chưa có người dùng admin, tạo mới
      const hashedPassword = await bcrypt.hash('admin123', 10); // Mã hóa mật khẩu

      const newAdmin = new User({
        username: 'admin',
        password: hashedPassword,
        email: 'admin@example.com', // Email mặc định cho admin
        phonenumber: '0123456789',  // Số điện thoại mặc định
        role: ['manager'], // Gán vai trò là manager
        profilePic: 'https://res.cloudinary.com/djhnuocm0/image/upload/v1732809983/TechMarket-User/default_user.jpg', // Avatar mặc định
        coverPic: 'https://res.cloudinary.com/djhnuocm0/image/upload/v1732810068/TechMarket-User-Cover/default_cover.png', // Cover mặc định
      });

      await newAdmin.save();
      console.log('Admin user created successfully admin@example.com admin123');
    } else {
      console.log('Admin user already exists admin@example.com admin123');
    }
  } catch (err) {
    console.error('Error creating admin user:', err.message);
  }
};

exports.getCart = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const cart = await userService.getCartByUserId(user);

    res.status(200).json({ data: cart, status: 'success' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
