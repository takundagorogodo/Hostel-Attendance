import express from 'express';
import { verifyToken, requireStaff } from '../middlewares/authMiddleware.js';
import { dailyReport, studentReport, roomReport } from '../controllers/reportController.js';

const router = express.Router();

router.get('/daily', verifyToken, requireStaff, dailyReport);
router.get('/student', verifyToken, requireStaff, studentReport);
router.get('/room', verifyToken, requireStaff, roomReport);

export default router;
