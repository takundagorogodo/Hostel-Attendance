import { createWardenService, deleteWardenService, updateWardenService, updateAdminService, updateWardenProfileService, registerStudentService } from '../services/userService.js';
import { AppError } from '../utils/appError.js';
import logger from '../utils/logger.js';

const stripPassword = (doc) => {
  const obj = doc.toObject ? doc.toObject() : doc;
  const { password: _, ...rest } = obj;
  return rest;
};

export const createWarden = async (req, res) => {
  try {
    const { username, password, role = 'warden' } = req.body;
    if (!username || !password) return res.status(400).json({ success: false, message: 'Username and password are required' });
    const user = await createWardenService(username, password, role);
    res.status(201).json({ success: true, message: 'Warden created successfully', user: stripPassword(user) });
  } catch (err) {
    if (err instanceof AppError) return res.status(err.statusCode).json({ success: false, message: err.message });
    logger.error('Create warden error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteWardenByAdmin = async (req, res) => {
  try {
    const user = await deleteWardenService(req.params.id);
    res.status(200).json({ success: true, message: 'Warden deleted successfully' });
  } catch (err) {
    if (err instanceof AppError) return res.status(err.statusCode).json({ success: false, message: err.message });
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateWardenByAdmin = async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) return res.status(400).json({ success: false, message: 'Username is required' });
    const user = await updateWardenService(req.params.id, username);
    res.status(200).json({ success: true, message: 'Warden username updated successfully', user: stripPassword(user) });
  } catch (err) {
    if (err instanceof AppError) return res.status(err.statusCode).json({ success: false, message: err.message });
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username && !password) return res.status(400).json({ success: false, message: 'At least one field is required' });
    const updated = await updateAdminService(req.user.id, { username, password });
    res.status(200).json({ success: true, message: 'Admin profile updated successfully', user: stripPassword(updated) });
  } catch (err) {
    if (err instanceof AppError) return res.status(err.statusCode).json({ success: false, message: err.message });
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateWardenByWarden = async (req, res) => {
  try {
    const { password } = req.body;
    if (!password) return res.status(400).json({ success: false, message: 'Password is required' });
    const updated = await updateWardenProfileService(req.user.id, password);
    res.status(200).json({ success: true, message: 'Password updated successfully', user: stripPassword(updated) });
  } catch (err) {
    if (err instanceof AppError) return res.status(err.statusCode).json({ success: false, message: err.message });
    res.status(500).json({ success: false, message: err.message });
  }
};

export const registerStudent = async (req, res) => {
  try {
    const { username, password, studentProfile } = req.body;
    if (!username || !password || !studentProfile) {
      return res.status(400).json({ success: false, message: 'Username, password, and student profile are required' });
    }
    const result = await registerStudentService({ username, password, studentProfile });
    res.status(201).json({
      success: true,
      message: 'Student registered successfully',
      user: stripPassword(result.user),
      student: result.student,
    });
  } catch (err) {
    if (err instanceof AppError) return res.status(err.statusCode).json({ success: false, message: err.message });
    logger.error('Register student error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};
