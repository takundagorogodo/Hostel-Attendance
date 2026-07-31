import Attendance from '../models/Attendance.js';
import Student from '../models/Student.js';
import { AppError } from '../utils/appError.js';

const todayISO = () => new Date().toISOString().split('T')[0];
const VALID_STATUSES = ['present', 'absent'];

export const markAttendanceService = async (studentId, status) => {
  if (!status) throw new AppError('Status is required', 400);
  if (!VALID_STATUSES.includes(status)) {
    throw new AppError(`Status must be one of: ${VALID_STATUSES.join(', ')}`, 400);
  }

  const student = await Student.findById(studentId);
  if (!student) throw new AppError('Student not found', 404);

  const today = todayISO();
  const existing = await Attendance.findOne({ student: studentId, date: today });
  if (existing) throw new AppError('Attendance already marked for today', 409);

  const attendance = await Attendance.create({ student: studentId, date: today, status });
  return attendance;
};

export const getAttendanceReportService = async ({ studentId, date, startDate, endDate }) => {
  const query = {};
  if (studentId) query.student = studentId;
  if (date) query.date = date;
  if (startDate && endDate) {
    query.date = { $gte: startDate, $lte: endDate };
  }
  const records = await Attendance.find(query).populate('student', 'name studentId room');
  return records;
};

export const getAttendanceSummaryService = async () => {
  const today = todayISO();
  const todayRecords = await Attendance.find({ date: today });
  const presentCount = todayRecords.filter(r => r.status === 'present').length;
  const absentCount = todayRecords.filter(r => r.status === 'absent').length;
  return {
    date: today,
    total: todayRecords.length,
    present: presentCount,
    absent: absentCount,
    rate: todayRecords.length ? (presentCount / todayRecords.length) : 0,
  };
};