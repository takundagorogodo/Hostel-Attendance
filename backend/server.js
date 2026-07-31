import 'dotenv/config';
import app from './app.js';
import logger from './utils/logger.js';

const PORT = process.env.PORT || 5000;

process.on('uncaughtException', (err) => {
  logger.error('uncaughtException:', err);
  process.exit(1);
});

const server = app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});

process.on('unhandledRejection', (reason) => {
  logger.error('unhandledRejection:', reason);
  server.close(() => process.exit(1));
});
