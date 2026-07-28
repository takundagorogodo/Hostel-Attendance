import express from 'express';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import studentRoutes from './studentRoutes.js';
import attendanceRoutes from './attendanceRoutes.js';
import reportRoutes from './reportRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/students', studentRoutes);
router.use('/attendance', attendanceRoutes);
router.use('/reports', reportRoutes);

export default router;