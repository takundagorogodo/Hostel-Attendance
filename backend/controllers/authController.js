import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const serverError = (res, err) =>
    res.status(500).json(
        { 
            success: false, 
            message: err.message 
        }
    );

const stripPassword = (doc) => {
    const { password: _omit, ...safeDoc } = doc._doc ?? doc;
    return safeDoc;
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "Username and password are required",
            });
        }

        const user = await User.findOne({ username, isDeleted: { $ne: true } });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
        );

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: stripPassword(user),
        });
    } catch (err) {
        return serverError(res, err);
    }
};

export const logout = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: "Logged out successfully. Please discard your token.",
        });
    } catch (err) {
        return serverError(res, err);
    }
};
