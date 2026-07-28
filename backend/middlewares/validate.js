import { z } from 'zod';
import logger from '../utils/logger.js';

export const validate = (schema) => (req, res, next) => {
  try {
    const parsed = schema.parse({
      body: req.body,
      params: req.params,
      query: req.query,
    });
    req.body = parsed.body || req.body;
    req.params = parsed.params || req.params;
    req.query = parsed.query || req.query;
    next();
  } catch (err) {
    logger.warn('Validation error:', err.errors || err.message);
    const errors = err.errors ? err.errors.map(e => e.message).join(', ') : err.message;
    return res.status(400).json({ success: false, message: `Validation error: ${errors}` });
  }
};
