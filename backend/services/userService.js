import User from '../models/User.js';
import Student from '../models/Student.js';
import bcrypt from 'bcryptjs';
import { AppError } from '../utils/appError.js';
import logger from '../utils/logger.js';

const SALT_ROUNDS = 12;

export const createWardenService = async (username, password, role = 'warden') => {
  const existing = await User.findOne({ username, isDeleted: { $ne: true } });
  if (existing) throw new AppError('Username already taken', 409);
  const hashed = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await User.create({ username, password: hashed, role });
  user.password = undefined;
  return user;
};

export const deleteWardenService = async (id) => {
  const user = await User.findById(id);
  if (!user || user.role !== 'warden') throw new AppError('Warden not found', 404);
  if (user.isDeleted) throw new AppError('Warden already deleted', 409);
  user.isDeleted = true;
  await user.save();
  return user;
};

export const updateWardenService = async (id, username) => {
  const user = await User.findById(id);
  if (!user || user.role !== 'warden') throw new AppError('Warden not found', 404);

  const duplicate = await User.findOne({ username, _id: { $ne: id }, isDeleted: { $ne: true } });
  if (duplicate) throw new AppError('Username already taken', 409);

  user.username = username;
  await user.save();
  user.password = undefined;
  return user;
};

export const updateAdminService = async (userId, { username, password }) => {
  const updateData = {};
  if (username) updateData.username = username;
  if (password) updateData.password = await bcrypt.hash(password, SALT_ROUNDS);

  const updated = await User.findByIdAndUpdate(userId, updateData, { new: true });
  if (!updated) throw new AppError('Admin account not found', 404);
  updated.password = undefined;
  return updated;
};

export const updateWardenProfileService = async (userId, password) => {
  if (!password) throw new AppError('Password is required', 400);
  const hashed = await bcrypt.hash(password, SALT_ROUNDS);
  const updated = await User.findByIdAndUpdate(userId, { password: hashed }, { new: true });
  if (!updated) throw new AppError('Warden account not found', 404);
  updated.password = undefined;
  return updated;
};

export const registerStudentService = async ({ username, password, studentProfile }) => {
  const existingUser = await User.findOne({ username, isDeleted: { $ne: true } });
  if (existingUser) throw new AppError('Username already exists', 409);

  const hashed = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await User.create({ username, password: hashed, role: 'student', profileModel: 'Student' });

  const student = await Student.create({ ...studentProfile, user: user._id });
  user.profile = student._id;
  await user.save();

  user.password = undefined;
  return { user, student };
};
