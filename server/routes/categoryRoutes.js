import express from 'express';
import { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from '../controllers/categoryController.js';
import { protect ,adminOnly} from '../middlewares/authMiddleware.js';

const router = express.Router();

// public routes for everyone
router.get('/', getAllCategories);
router.get('/:id', getCategoryById);

// protected routes only for admin 
router.post('/', protect , adminOnly, createCategory);
router.put('/:id',protect, adminOnly, updateCategory);
router.delete('/:id', protect, adminOnly, deleteCategory);

export default router;



