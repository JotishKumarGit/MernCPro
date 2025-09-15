import express from 'express';
import { createOrUpdateReview, createProduct, deleteProduct, deleteReview, getAllProducts, getProductById, getProductReviews, updateProduct } from '../controllers/productController.js';
import { adminOnly, protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// public routes for everyone
router.get('/', getProductById);
router.get('/:id', getAllProducts);

// protected routes only for admin 
router.post('/', protect , adminOnly, createProduct);
router.put('/:id',protect, adminOnly, updateProduct);
router.delete('/:id', protect, adminOnly, deleteProduct);

router.post('/:id/reviews', protect, createOrUpdateReview); // Add or update review
router.get('/:id/reviews', getProductReviews);               // Get all reviews
router.delete('/:productId/reviews/:reviewId', protect, adminOnly, deleteReview); // Delete review


export default router;
