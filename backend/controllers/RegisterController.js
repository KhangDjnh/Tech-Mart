const register = require("../Services/RegisterService");
const Joi = require("joi");
const genAuthToken = require("../utils/genAuthToken");
const cloudinary = require("../utils/cloudinary");

exports.registerUser = async (req, res) => {
    const schema = Joi.object({
        username: Joi.string().min(3).max(30).required(),
        email: Joi.string().min(3).max(200).required().email(),
        password: Joi.string().min(8).max(1024).required(),
        phonenumber: Joi.string().min(9).max(22).required(),
        profilePic: Joi.string().allow(null, ''),
        coverPic: Joi.string().allow(null, '')
    });

    const { error } = schema.validate(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    try {
        let userInDB = await register.registerFindUser(req.body.email);

        if (userInDB) return res.status(400).send("User already exists...");
        else {
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

        }

        const user = await register.registerUser(req.body);
        const token = genAuthToken(user);

        res.status(200).send(token);

    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Internal Server Error");
    }
};
