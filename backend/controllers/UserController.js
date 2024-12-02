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

    // Kiểm tra và đặt ảnh avatar mặc định nếu không có
    let profilePic = "https://res.cloudinary.com/djhnuocm0/image/upload/v1732809983/TechMarket-User/default_user.jpg";
    if (req.file?.profilePic) {
      const uploadedImage = await imageService.uploadImage(req.file.profilePic, "TechMarket-User");
      if (!uploadedImage) {
        throw new Error("Error: Can't upload image to Cloudinary");
      }
      profilePic = uploadedImage;
    }

    // Kiểm tra và đặt ảnh cover mặc định nếu không có
    let coverPic = "https://res.cloudinary.com/djhnuocm0/image/upload/v1732810068/TechMarket-User-Cover/default_cover.png"; // Đường dẫn tới ảnh cover mặc định
    if (req.file?.coverPic) {
      const uploadedCoverImage = await imageService.uploadImage(req.file.coverPic, "TechMarket-User-Cover");
      if (!uploadedCoverImage) {
        throw new Error("Error: Can't upload cover image to Cloudinary");
      }
      coverPic = uploadedCoverImage;
    }

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
    let user = await userService.getUserById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Xử lý hình ảnh nếu có
    if (req.file?.profilePic) {
      // Tải ảnh mới lên
      const uploadedImage = await imageService.uploadImage(req.file.profilePic, "TechMarket-User");
      if (!uploadedImage) {
        throw new Error("Failed to upload image to Cloudinary");
      }
      req.body.profilePic = uploadedImage;
    }

    // Xử lý coverPic nếu có
    if (req.file?.coverPic) {
      const uploadedCoverImage = await imageService.uploadImage(req.file.coverPic, "TechMarket-User-Cover");
      if (!uploadedCoverImage) {
        throw new Error("Failed to upload cover image to Cloudinary");
      }
      req.body.coverPic = uploadedCoverImage;
    }

    const { username, email, phonenumber, address, gender, birthday, role, password, id_shop } = req.body;

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
