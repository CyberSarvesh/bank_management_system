import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db.js';

import { authenticateUser, authorizeRoles } from './middlewares/authenticatorMidd.js';
import adminRoutes from './routes/adminRoutes.js';
import staffRoutes from './routes/staffRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import managerRoutes from './routes/managerRoutes.js';
import { logRequests } from './middleware/loggerMiddleware.js'; // Importing logger middleware
import logger from './utils/logger.js'; // Importing the logger

dotenv.config();
const app = express();

// Connect to the database
connectDb();

// Log server startup
logger.info('Server started successfully');

// Middleware to log requests
app.use(logRequests);

// Parse incoming JSON requests
app.use(express.json());

// Use routes
app.use('/api/admin', adminRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/customer', customerRoutes);
app.use('/api/manager', managerRoutes);

// Error handling middleware (logs errors)
app.use((err, req, res, next) => {
  logger.error(`Error occurred: ${err.message} | Stack: ${err.stack}`);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`The server is running on localhost:${process.env.PORT}`);
});
