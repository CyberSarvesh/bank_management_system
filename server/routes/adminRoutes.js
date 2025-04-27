import express from 'express';
import { authenticateUser, authorizeRoles } from '../middlewares/authenticatorMidd.js'; // Corrected middleware imports
import { createUser, getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/customerController.js';
import { getAllTransactions, getUserTransactions } from '../controllers/transactionController.js';
import { getAllLoans, getLoanById, updateLoanStatus } from '../controllers/loanController.js';
import { getAllBranches, assignStaffToBranch } from '../controllers/branchController.js';
import { createAdminLog, getAdminLogs } from '../controllers/logController.js';
import { generateLoanReport, generateTransactionReport } from '../controllers/reportController.js';

const router = express.Router();

// Customer routes
router.post('/users', authenticateUser, authorizeRoles('admin'), createUser); // Create user
router.get('/users', authenticateUser, authorizeRoles('admin'), getAllUsers); // Get all users
router.get('/users/:userId', authenticateUser, authorizeRoles('admin'), getUserById); // Get user by ID
router.put('/users', authenticateUser, authorizeRoles('admin'), updateUser); // Update user info
router.delete('/users', authenticateUser, authorizeRoles('admin'), deleteUser); // Delete user

// Transaction Management Routes (accessible by admin only)
router.get('/transactions', authenticateUser, authorizeRoles('admin'), getAllTransactions); // Get all transactions
router.get('/transactions/user', authenticateUser, authorizeRoles('admin'), getUserTransactions); // Get user transactions by user data in body

// Loan Management Routes (accessible by admin only)
router.get('/loans', authenticateUser, authorizeRoles('admin'), getAllLoans); // Get all loans
router.get('/loans/:loanId', authenticateUser, authorizeRoles('admin'), getLoanById); // Get loan by ID
router.patch('/loans/:loanId', authenticateUser, authorizeRoles('admin'), updateLoanStatus); // Approve/Reject loan

// Branch Management Routes (accessible by admin only)
router.get('/branches', authenticateUser, authorizeRoles('admin'), getAllBranches); // Get all branches
router.post('/branches/staff', authenticateUser, authorizeRoles('admin'), assignStaffToBranch); // Assign staff to branch

// Admin Activity Logging Routes
router.post('/logs', authenticateUser, authorizeRoles('admin'), createAdminLog); // Create admin log
router.get('/logs', authenticateUser, authorizeRoles('admin'), getAdminLogs); // Get all admin logs

// Report Generation Routes (accessible by admin only)
router.get('/reports/loans', authenticateUser, authorizeRoles('admin'), generateLoanReport); // Generate loan report PDF
router.get('/reports/transactions', authenticateUser, authorizeRoles('admin'), generateTransactionReport); // Generate transaction report PDF

// Health Check Route
router.get('/health', authenticateUser, authorizeRoles('admin'), (req, res) => {
  res.status(200).json({ message: 'System is healthy!' });
});

export default router;
