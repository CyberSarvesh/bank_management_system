import express from 'express';
import { authenticateUser, authorizeRole } from '../middlewares/authenticatorMidd.js';
import { getUserTransactions } from '../controllers/transactionController.js';

const router = express.Router();

// ------------------ Staff Routes ------------------

// Transaction Management
router.post('/transactions/deposit', authenticateUser, authorizeRole('staff'), getUserTransactions); // Deposit money
router.post('/transactions/withdraw', authenticateUser, authorizeRole('staff'), getUserTransactions); // Withdraw money

export default router;
