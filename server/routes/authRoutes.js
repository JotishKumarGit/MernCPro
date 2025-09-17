import express from 'express';
import { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getProfile, updateProfile, toggleWishlist, getMyWishlist, removeFromWishlist } from '../controllers/authController.js';
import upload from '../middlewares/upload.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', upload.single('profilePic'), registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:token', resetPassword);

router.get('/profile', protect, getProfile);
router.put('/update-profile', protect, upload.single('profilePic'), updateProfile);


// Wishlist routes
router.post('/wishlist/:productId', protect, toggleWishlist);
router.get('/wishlist', protect, getMyWishlist);
router.delete('/wishlist/:productId', protect, removeFromWishlist);



export default router;
