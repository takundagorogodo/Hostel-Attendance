import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import connectDB from './config/db.js';
import mainRoutes from './routes/mainRoutes.js';
import { notFound, globalErrorHandler } from './middlewares/errorMiddleware.js';
import { httpLogger } from './middlewares/httpLogger.js';
import logger from './utils/logger.js';

dotenv.config();

const app = express();

app.use(helmet());
app.use(httpLogger);

app.use(cors({
  origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', mainRoutes);
app.get('/health', (req, res) => res.status(200).json({ status: 'ok', time: new Date().toISOString() }));

app.use(notFound);
app.use(globalErrorHandler);

await connectDB();

export default app;