import express from 'express';
import { getAdminDashboard } from '../controllers/adminController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Dashboard route
router.get('/dashboard', protect, adminOnly, getAdminDashboard);

export default router;
