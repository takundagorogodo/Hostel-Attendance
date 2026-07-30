import express from 'express';
import { login, logout } from '../controllers/authController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { authLimiter } from '../middlewares/rateLimit.js';

const router = express.Router();

router.post('/login', authLimiter, login);
router.post('/logout', verifyToken, logout);

export default router;
