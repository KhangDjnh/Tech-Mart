const loginService = require("../Services/LoginService");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const genAuthToken = require("../utils/genAuthToken");

exports.loginUser = async (req, res) => {

    const schema = Joi.object({
        email: Joi.string().min(3).max(200).required().email(),
        password: Joi.string().min(8).max(1024).required()
    });

    const { error } = schema.validate(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    try {
        if (!req.body.email || !req.body.password) {
            throw new Error("Email and password are required.");
        }

        let userInDB = await loginService.loginUser(req.body.email);

        if (!userInDB) {
           return res.status(400).send("The account and email address do not exist.");
        }

        const isValid = await bcrypt.compare(req.body.password, userInDB.password);

        if (!isValid) return res.status(400).send("Password wrong");

        const token = genAuthToken(userInDB);

        // Trả về cả token và thông tin người dùng
        res.send({
            token,
            user: {
                id: userInDB._id,
                username: userInDB.username,
                email: userInDB.email,
                phonenumber: userInDB.phonenumber,
                fullname: userInDB.fullname,
                address: userInDB.address,
                gender: userInDB.gender,
                birthday: userInDB.birthday,
                profilePic: userInDB.profilePic,
                coverPic: userInDB.coverPic,
                role: userInDB.role
            }
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
