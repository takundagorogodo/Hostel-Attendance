import { getDailyReportService, getStudentAttendanceService, getRoomAttendanceService } from '../services/reportService.js';
import logger from '../utils/logger.js';

export const dailyReport = async (req, res) => {
  try {
    const { date } = req.query;
    const report = await getDailyReportService(date);
    res.status(200).json({ success: true, report });
  } catch (err) {
    logger.error('Daily report error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const studentReport = async (req, res) => {
  try {
    const { studentId, startDate, endDate } = req.query;
    if (!studentId) return res.status(400).json({ success: false, message: 'studentId is required' });
    const report = await getStudentAttendanceService(studentId, startDate, endDate);
    res.status(200).json({ success: true, report });
  } catch (err) {
    logger.error('Student report error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const roomReport = async (req, res) => {
  try {
    const { roomId, startDate, endDate } = req.query;
    if (!roomId) return res.status(400).json({ success: false, message: 'roomId is required' });
    const report = await getRoomAttendanceService(roomId, startDate, endDate);
    res.status(200).json({ success: true, report });
  } catch (err) {
    logger.error('Room report error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};
