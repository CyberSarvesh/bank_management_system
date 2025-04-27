import express from 'express';
import { authenticateUser, authorizeRole } from '../middleware/authMiddleware.js';
import { getUserById, updateUser } from '../controllers/userController.js';
import { getUserTransactions } from '../controllers/transactionController.js';
import { getAllLoans, getLoanById, updateLoanStatus } from '../controllers/loanController.js';

const router = express.Router();

// ------------------ Customer Routes ------------------

// User Profile
router.get('/profile', authenticateUser, authorizeRole('customer'), getUserById); // View customer profile
router.put('/profile', authenticateUser, authorizeRole('customer'), updateUser); // Update customer profile

// Transaction Management
router.get('/transactions', authenticateUser, authorizeRole('customer'), getUserTransactions); // Get customer transactions

// Loan Management
router.get('/loans', authenticateUser, authorizeRole('customer'), getAllLoans); // Get all customer loans
router.get('/loans/:loanId', authenticateUser, authorizeRole('customer'), getLoanById); // Get specific loan details
router.post('/loans', authenticateUser, authorizeRole('customer'), updateLoanStatus); // Apply for loan

export default router;
