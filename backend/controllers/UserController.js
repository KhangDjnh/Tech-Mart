const userService = require("../services/UserService");
const cloudinary = require("../utils/cloudinary");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
  var avatarPublicId;

  try {
    if (!req.body || !req.body.email) {
      throw new Error("Email is required.");
    }

    if (req.body.profilePic) {
      const uploadedResponse = await cloudinary.uploader.upload(
        req.body.profilePic,
        {
          upload_preset: "TechMarket-User",
        }
      );
      if (!uploadedResponse) {
        throw new Error("Error: Can't upload image to Cloudinary");
      }
      req.body.profilePic = uploadedResponse;
      avatarPublicId = uploadedResponse.public_id;
    }

    const user = await userService.createUser(req.body);
    res.status(200).json({ data: user, status: "success" });
  } catch (err) {
    try {
      if (avatarPublicId) {
        const destroyResponse = await cloudinary.uploader.destroy(avatarPublicId);
        if (!destroyResponse.result === "ok") {
          throw new Error("Failed to delete image from Cloudinary");
        }
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
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

    if (req.body.profilePic) {
      if (user.profilePic && user.profilePic.public_id) {
        await cloudinary.uploader.destroy(user.profilePic.public_id);
      }

      const uploadedResponse = await cloudinary.uploader.upload(
        req.body.profilePic,
        {
          upload_preset: "TechMarket-User",
        }
      );

      if (!uploadedResponse) {
        throw new Error("Failed to upload image to Cloudinary");
      }

      req.body.profilePic = uploadedResponse;
    }

    const { username, email, phonenumber, address, gender, birthday, role, password } = req.body;

    if (password && password !== user.password) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      req.body.password = hashPassword;
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
      const destroyResponse = await cloudinary.uploader.destroy(user.profilePic.public_id);
      if (!destroyResponse.result === "ok") {
        throw new Error("Failed to delete image from Cloudinary");
      }
    }

    const deletedUser = await userService.deleteUser(req.params.id);
    res.status(200).json({ data: deletedUser, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
