import { markAttendanceService, getAttendanceReportService, getAttendanceSummaryService } from '../services/attendanceService.js';
import { AppError } from '../utils/appError.js';
import logger from '../utils/logger.js';

export const markAttendance = async (req, res) => {
  try {
    const attendance = await markAttendanceService(req.params.id, req.body.status);
    res.status(201).json({ success: true, message: 'Attendance marked successfully', attendance });
  } catch (err) {
    if (err instanceof AppError) return res.status(err.statusCode).json({ success: false, message: err.message });
    logger.error('Mark attendance error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAttendanceReport = async (req, res) => {
  try {
    const { studentId, date, startDate, endDate } = req.query;
    const records = await getAttendanceReportService({ studentId, date, startDate, endDate });
    res.status(200).json({ success: true, count: records.length, records });
  } catch (err) {
    logger.error('Get attendance report error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAttendanceSummary = async (req, res) => {
  try {
    const summary = await getAttendanceSummaryService();
    res.status(200).json({ success: true, summary });
  } catch (err) {
    logger.error('Get attendance summary error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};
