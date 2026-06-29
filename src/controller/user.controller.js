const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UserModel = require('../model/user.model')

const registerUser = asyncHandler(async (req, res) => {

    const { username, email, password } = req.body;
    res.status(400);

    if (!username || !email || !password) {
        res.status(400).json({ message: "All fields required" })
        return;
    }

    const userAvailable = await UserModel.findOne({ email });
    if (userAvailable) {
        res.status(400).json({ message: "User already registered" })
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
        username,
        email,
        password: hashedPassword
    });

    if (newUser) {
        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            hashedPassword: password
        })
    } else {
        res.status(400).json({ message: "User data not found" })
    }

})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    // Find User
    const user = await UserModel.findOne({ email });

    // Check User & Password
    if (user && (await bcrypt.compare(password, user.password))) {

        const accessToken = jwt.sign(
            {
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: "1h",
            }
        );

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: false, // true in production HTTPS
            sameSite: "strict",
            maxAge: 60 * 60 * 1000,
        });

        res.status(200).json({
            message: "Login Successfully",
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                accessToken,
            }
        });

    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

const currentUser = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };