
import express from 'express';
import { placeOrder, cancelOrder, markOrderAsPaid, getMyOrders, getAllOrders, updateOrderStatus } from '../controllers/orderController.js';
import { adminOnly, protect } from '../middlewares/authMiddleware.js';

const router = express.Router();
// USER ROUTES
router.post('/', protect, placeOrder); // Place order
router.put('/:id/cancel', protect, cancelOrder); // Cancel order
router.put('/:id/pay', protect, markOrderAsPaid); // Simulate payment
router.get('/my-orders', protect, getMyOrders); // View own orders

// ADMIN ROUTES
router.get('/', protect, adminOnly, getAllOrders); // View all orders
router.put('/:id/status', protect, adminOnly, updateOrderStatus); // Update status

export default router;

