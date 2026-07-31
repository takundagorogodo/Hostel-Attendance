import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('✅ MongoDB Connected');

    const existing = await User.findOne({ role: 'admin', isDeleted: { $ne: true } });
    if (existing) {
      console.log('❌ Admin already exists:', existing.username);
      process.exit(0);
    }

    if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD) {
      throw new Error('Missing ADMIN_USERNAME or ADMIN_PASSWORD in .env');
    }

    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12);
    const admin = await User.create({
      username: process.env.ADMIN_USERNAME,
      password: hashedPassword,
      role: 'admin',
    });

    console.log('✅ Admin created successfully');
    console.log('👤 Username:', admin.username);
    console.log('🔑 Password:', process.env.ADMIN_PASSWORD);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

createAdmin();
