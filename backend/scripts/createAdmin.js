import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import "dotenv/config";
import User from "../models/User.js";

const createAdmin = async () => {
  try {
    // ✅ Connect DB directly (simple & reliable)
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ MongoDB Connected");

    // ✅ Ensure only ONE admin
    const existing = await User.findOne({ role: "admin" });
    if (existing) {
      console.log("❌ Admin already exists:", existing.username);
      process.exit(0);
    }

    // ✅ Validate env
    if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD) {
      throw new Error("Missing ADMIN_USERNAME or ADMIN_PASSWORD in .env");
    }

    // ✅ Hash password (clean approach)
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12);

    // ✅ Create admin
    const admin = await User.create({
      username: process.env.ADMIN_USERNAME,
      password: hashedPassword,
      role: "admin",
    });

    console.log("✅ Admin created successfully");
    console.log("👤 Username:", admin.username);
    console.log("🔑 Password:", process.env.ADMIN_PASSWORD);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

createAdmin();