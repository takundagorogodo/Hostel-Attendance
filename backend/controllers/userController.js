
import bcrypt from "bcrypt";
import User from "../models/User.js";

const SALT_ROUNDS = 10;

const stripPassword = (doc) => {
    const { password: _omit, ...safeDoc } = doc._doc ?? doc;
    return safeDoc;
};

const serverError = (res, err) =>
    res.status(500).json(
        { 
            success: false, 
            message: err.message 
        }
    );

export const createWarden = async (req, res) => {
    try {
        const { username, password, role = "warden" } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "Username and password are required",
            });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "A user with that username already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const user = await User.create({ username, password: hashedPassword, role });

        return res.status(201).json({
            success: true,
            message: "Warden created successfully",
            user: stripPassword(user),
        });
    } catch (err) {
        return serverError(res, err);
    }
};

export const deleteWardenByAdmin = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);
        if (!user || user.role !== "warden") {
            return res.status(404).json({
                success: false,
                message: "Warden not found",
            });
        }

        if (user.isDeleted) {
            return res.status(409).json({
                success: false,
                message: "Warden is already deleted",
            });
        }

        user.isDeleted = true;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Warden deleted successfully",
        });
    } catch (err) {
        return serverError(res, err);
    }
};

export const updateWardenByAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const { username } = req.body;

        if (!username) {
            return res.status(400).json({
                success: false,
                message: "Username is required",
            });
        }

        const user = await User.findById(id);
        if (!user || user.role !== "warden") {
            return res.status(404).json({
                success: false,
                message: "Warden not found",
            });
        }

        const duplicate = await User.findOne({ username, _id: { $ne: id } });
        if (duplicate) {
            return res.status(409).json({
                success: false,
                message: "That username is already taken",
            });
        }

        user.username = username;
        const updatedUser = await user.save();

        return res.status(200).json({
            success: true,
            message: "Warden username updated successfully",
            user: stripPassword(updatedUser),
        });
    } catch (err) {
        return serverError(res, err);
    }
};

export const updateAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username && !password) {
            return res.status(400).json({
                success: false,
                message: "At least one field (username or password) is required",
            });
        }

        const updateData = {};
        if (username) updateData.username = username;
        if (password) updateData.password = await bcrypt.hash(password, SALT_ROUNDS);

        const updatedAdmin = await User.findByIdAndUpdate(
            req.user.id,
            updateData,
            { new: true }
        );

        if (!updatedAdmin) {
            return res.status(404).json({
                success: false,
                message: "Admin account not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Admin profile updated successfully",
            user: stripPassword(updatedAdmin),
        });
    } catch (err) {
        return serverError(res, err);
    }
};


export const updateWardenByWarden = async (req, res) => {
    try {
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({
                success: false,
                message: "Password is required",
            });
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { password: hashedPassword },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "Warden account not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Password updated successfully",
        });
    } catch (err) {
        return serverError(res, err);
    }
};
