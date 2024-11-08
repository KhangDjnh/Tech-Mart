const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');
require("dotenv").config();

const uri = process.env.MONGODB_URI;

mongoose.connect(uri).then(() => console.log("Database connected!"))
.catch(error => console.log("Database connection error:", error));

const createUserWithId = async () => {
    try {
        const hashedPassword = await bcrypt.hash("congngheweb20241", 10); 

        const user = new User({
            _id: "6631eca7cdb504839a6da6d1",
            username: "defaultEmployee",
            password: hashedPassword,
            email: "employee@example.com",
            phonenumber: "0123456789",
            gender: "Male",
            role: ["buyer"]
        });

        await user.save();
        console.log("User created successfully with specific _id!");
    } catch (error) {
        console.error("Error creating user:", error);
    } finally {
        mongoose.connection.close();
    }
};

createUserWithId();
