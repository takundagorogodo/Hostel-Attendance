import express from 'express';
import { verifyToken, requireAdmin, requireStaff } from '../middlewares/authMiddleware.js';
import { addStudent, deleteStudent, changeRoom, transferStudent } from '../controllers/studentController.js';

const router = express.Router();

router.post('/', verifyToken, requireStaff, addStudent);
router.delete('/:id', verifyToken, requireAdmin, deleteStudent);
router.patch('/:id/room', verifyToken, requireAdmin, changeRoom);
router.patch('/:id/transfer', verifyToken, requireAdmin, transferStudent);

export default router;
