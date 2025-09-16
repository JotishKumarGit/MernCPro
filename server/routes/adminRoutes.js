import express from 'express';
import { generateInvoice, getAdminDashboard, getAOV, getLowStockProducts, getMonthlyRevenue, getOrderStatuses, getTopSellingProducts } from '../controllers/adminController.js';
import { protect, adminOnly } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Dashboard route
router.get('/dashboard', protect, adminOnly, getAdminDashboard);

// revenue
router.get('/revenue/monthly', getMonthlyRevenue);
router.get('/orders/status-counts', getOrderStatuses);
router.get('/stock/low', getLowStockProducts);
router.get('/products/top-selling', getTopSellingProducts);
router.get('/orders/aov', getAOV);

// invoice generate
router.get('/invoice/:id', protect, adminOnly, generateInvoice);

export default router;
