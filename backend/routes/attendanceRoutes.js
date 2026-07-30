import express from 'express';
import { verifyToken, requireStaff } from '../middlewares/authMiddleware.js';
import { markAttendance, getAttendanceReport, getAttendanceSummary } from '../controllers/attendanceController.js';

const router = express.Router();

router.post('/:id', verifyToken, requireStaff, markAttendance);
router.get('/', verifyToken, requireStaff, getAttendanceReport);
router.get('/summary', verifyToken, requireStaff, getAttendanceSummary);

export default router;
