import winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';
import path from 'path';

// Directory where logs will be stored
const logDirectory = path.join(__dirname, '../logs'); 

import fs from 'fs';
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

const dailyRotateFileTransport = new winstonDaily({
  level: 'info',  
  datePattern: 'YYYY-MM-DD',  
  filename: path.join(logDirectory, '%DATE%-combined.log'),  
  maxSize: '20m', 
  maxFiles: '14d',
});

// Logger setup
const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
    dailyRotateFileTransport,
  ],
});

export default logger;
