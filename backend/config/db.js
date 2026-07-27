import mongoose from 'mongoose';
import { env } from './env.js';
import logger from '../utils/logger.js';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.MONGO_URL);
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    logger.error('DB connection failed:', error.message);
    process.exit(1);
  }
};

export default connectDB;
