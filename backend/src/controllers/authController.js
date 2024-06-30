const User = require("../models/userSchema");
const bcrypt = require('bcrypt');
const {JWTsign} = require('../config/JWT')


const registerController = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ "message": "Username or password missing in request" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exist with this email" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({ message: "User created successfully.", user: newUser });
    } catch (error) {
        console.log("error in register", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


module.exports.registerController = registerController;

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ "message": "Email or password missing in request" });
        }

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({ Success: false, Message: "Invalid User" });
        }

        const isPasswordMatch = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordMatch) {
            return res.status(404).json({ Success: false, Message: "Invalid User" });
        }

        const token = JWTsign(existingUser._id.toString());

        if (!token) {
            return res.status(500).json({ message: "Could not generate token" });
        }

        res.cookie('token', token, {
            sameSite: 'lax',
            httpOnly: true,
        });

        res.status(201).json({ Success: true, Message: "Valid User" });

    } catch (error) {
        console.error("Error in login route", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports.loginController = loginController;


const logoutController = async (req, res) => {
    try {
        res.clearCookie('token');
        res.send('Cookie cleared');
    } catch (error) {
        console.error("Error in logout route", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports.logoutController = logoutController;
