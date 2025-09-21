import express from 'express';
import { createOrUpdateReview, createProduct, deleteProduct, deleteReview, getAllProducts, getProductById, getProductReviews, updateProduct } from '../controllers/productController.js';

import { adminOnly, protect } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

// public routes for everyone
router.get('/', getAllProducts);
router.get('/:id', getProductById);

// protected routes only for admin (image upload ke sath)
router.post('/', protect, adminOnly, upload.single("image"), createProduct);
router.put('/:id', protect, adminOnly, upload.single("image"), updateProduct);
router.delete('/:id', protect, adminOnly, deleteProduct);

// reviews
router.post('/:id/reviews', protect, createOrUpdateReview);
router.get('/:id/reviews', getProductReviews);
router.delete('/:productId/reviews/:reviewId', protect, adminOnly, deleteReview);

export default router;
