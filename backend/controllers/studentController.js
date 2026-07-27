import { addStudentService, deleteStudentService, changeRoomService, transferStudentService } from '../services/studentService.js';
import { AppError } from '../utils/appError.js';
import logger from '../utils/logger.js';

export const addStudent = async (req, res) => {
  try {
    const student = await addStudentService(req.body);
    res.status(201).json({ success: true, message: 'Student enrolled successfully', student });
  } catch (err) {
    if (err instanceof AppError) return res.status(err.statusCode).json({ success: false, message: err.message });
    logger.error('Add student error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    await deleteStudentService(req.params.id);
    res.status(200).json({ success: true, message: 'Student removed successfully' });
  } catch (err) {
    if (err instanceof AppError) return res.status(err.statusCode).json({ success: false, message: err.message });
    res.status(500).json({ success: false, message: err.message });
  }
};

export const changeRoom = async (req, res) => {
  try {
    const { newRoomId } = req.body;
    const student = await changeRoomService(req.params.id, newRoomId);
    res.status(200).json({ success: true, message: 'Room changed successfully', student });
  } catch (err) {
    if (err instanceof AppError) return res.status(err.statusCode).json({ success: false, message: err.message });
    res.status(500).json({ success: false, message: err.message });
  }
};

export const transferStudent = async (req, res) => {
  try {
    const { newHostelId } = req.body;
    const result = await transferStudentService(req.params.id, newHostelId);
    res.status(200).json({ success: true, message: result.message, room: result.room });
  } catch (err) {
    if (err instanceof AppError) return res.status(err.statusCode).json({ success: false, message: err.message });
    res.status(500).json({ success: false, message: err.message });
  }
};
