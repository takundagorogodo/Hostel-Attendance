import Attendance from '../models/Attendance.js';
import Student from '../models/Student.js';

export const getDailyReportService = async (date) => {
  const records = await Attendance.find({ date }).populate('student', 'name studentId room');
  const present = records.filter(r => r.status === 'present').length;
  return { date, total: records.length, present, absent: records.length - present, records };
};

export const getStudentAttendanceService = async (studentId, startDate, endDate) => {
  const query = { student: studentId };
  if (startDate && endDate) query.date = { $gte: startDate, $lte: endDate };
  const records = await Attendance.find(query).sort({ date: -1 });
  const total = records.length;
  const present = records.filter(r => r.status === 'present').length;
  return { studentId, total, present, absent: total - present, attendanceRate: total ? present / total : 0, records };
};

export const getRoomAttendanceService = async (roomId, startDate, endDate) => {
  const students = await Student.find({ room: roomId }).select('_id');
  const studentIds = students.map(s => s._id);
  const query = { student: { $in: studentIds } };
  if (startDate && endDate) query.date = { $gte: startDate, $lte: endDate };
  const records = await Attendance.find(query).populate('student', 'name studentId');
  const present = records.filter(r => r.status === 'present').length;
  return { roomId, total: records.length, present, absent: records.length - present, records };
};
