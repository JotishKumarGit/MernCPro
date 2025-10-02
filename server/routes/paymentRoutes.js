import express from "express";
import { createRazorpayOrder, verifyPayment } from "../controllers/paymentController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Create Razorpay order
router.post("/razorpay/create-order", protect, createRazorpayOrder);

// Verify payment
router.post("/razorpay/verify", protect, verifyPayment);

export default router;
