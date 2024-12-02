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
            if (!req.body.profilePic) {
                req.body.profilePic = "https://res.cloudinary.com/djhnuocm0/image/upload/v1732809983/TechMarket-User/default_user.jpg";
            } else {
                const uploadedProfilePic = await cloudinary.uploader.upload(req.body.profilePic, {
                    upload_preset: "TechMarket-User",
                });

                if (!uploadedProfilePic) {
                    throw new Error("Error: Can't upload profile image to Cloudinary");
                }

                req.body.profilePic = uploadedProfilePic.url; 
            } 
            if (!req.body.coverPic) {
                req.body.coverPic = "https://res.cloudinary.com/djhnuocm0/image/upload/v1732810068/TechMarket-User-Cover/default_cover.png";
            } else {
                const uploadedCoverPic = await cloudinary.uploader.upload(req.body.coverPic, {
                    upload_preset: "TechMarket-User-Cover",
                });

                if (!uploadedCoverPic) {
                    throw new Error("Error: Can't upload cover image to Cloudinary");
                }

                req.body.coverPic = uploadedCoverPic.url;
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
