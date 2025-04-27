import express from 'express';
import { authenticateUser, authorizeRole } from '../middleware/authMiddleware.js';
import { getAllLoans, getLoanById, updateLoanStatus } from '../controllers/loanController.js';
import { getAllTransactions, getUserTransactions } from '../controllers/transactionController.js';

const router = express.Router();

// ------------------ Manager Routes ------------------

// Loan Management
router.get('/loans', authenticateUser, authorizeRole('manager'), getAllLoans); // Get all loans for the branch
router.get('/loans/:loanId', authenticateUser, authorizeRole('manager'), getLoanById); // Get loan by ID
router.patch('/loans', authenticateUser, authorizeRole('manager'), updateLoanStatus); // Approve/Reject loan

// Transaction Management
router.get('/transactions', authenticateUser, authorizeRole('manager'), getAllTransactions); // Get all transactions for the branch
router.get('/transactions/user', authenticateUser, authorizeRole('manager'), getUserTransactions); // Get user transactions for the branch

export default router;
