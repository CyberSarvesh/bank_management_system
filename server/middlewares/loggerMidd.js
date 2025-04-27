import fs from 'fs';
import path from 'path';
import winston from 'winston';
import { format } from 'logform';

// Create logs directory if it doesn't exist
const logDirectory = path.join(__dirname, '../logs');
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

// Define the logger
const logger = winston.createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.File({
      filename: path.join(logDirectory, 'activity.log'),
      level: 'info',
    }),
    new winston.transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple()
      ),
    }),
  ],
});

// Middleware to log requests
export const logRequests = (req, res, next) => {
  const { method, url, body, user } = req;
  const logMessage = `Request: ${method} ${url} ${JSON.stringify(body)} | User: ${user ? user._id : 'None'}`;

  // Log the request
  logger.info(logMessage);

  // Proceed to the next middleware/route handler
  next();
};

export default logger;
