import { loginService } from '../services/authService.js';
import { AppError } from '../utils/appError.js';
import logger from '../utils/logger.js';

const serverError = (res, err) => res.status(500).json({ success: false, message: err.message });

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Username and password are required' });
    }
    const result = await loginService(username, password);
    res.status(200).json({ success: true, message: 'Login successful', token: result.token, user: result.user });
  } catch (err) {
    if (err instanceof AppError) return res.status(err.statusCode).json({ success: false, message: err.message });
    logger.error('Login error:', err);
    serverError(res, err);
  }
};

export const logout = async (req, res) => {
  try {
    res.status(200).json({ success: true, message: 'Logged out successfully. Please discard your token.' });
  } catch (err) {
    serverError(res, err);
  }
};
