import express from 'express';
import { verifyToken, requireAdmin, requireWarden, requireStaff } from '../middlewares/authMiddleware.js';
import { createWarden, deleteWardenByAdmin, updateWardenByAdmin, updateAdmin, updateWardenByWarden, registerStudent } from '../controllers/userController.js';

const router = express.Router();

router.post('/wardens', verifyToken, requireAdmin, createWarden);
router.delete('/wardens/:id', verifyToken, requireAdmin, deleteWardenByAdmin);
router.patch('/wardens/:id', verifyToken, requireAdmin, updateWardenByAdmin);
router.patch('/admin/me', verifyToken, requireAdmin, updateAdmin);
router.patch('/warden/me', verifyToken, requireWarden, updateWardenByWarden);
router.post('/students/register', verifyToken, requireStaff, registerStudent);

export default router;