// controllers/paymentController.js
import crypto from "crypto";
import razorpay from "../config/razorpay.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Cart from "../models/Cart.js";

/**
 * POST /api/payment/razorpay/create-order
 * req.body: { orderId }  (our DB order id)
 * returns: { key, orderId (razorpay), amount, currency }
 */
export const createRazorpayOrder = async (req, res) => {
    try {
        const { orderId } = req.body;

        console.log("📦 Received orderId:", orderId);

        const order = await Order.findById(orderId);
        if (!order) return res.status(404).json({ message: "Order not found" });

        console.log("✅ Fetched Order from DB:", order);

        const amount = Math.round(order.totalAmount * 100);

        // Check if amount is NaN or zero
        if (!amount || isNaN(amount)) {
            return res.status(400).json({ message: "Invalid amount calculated" });
        }

        const options = {
            amount,
            currency: "INR",
            receipt: `receipt_${order._id}`,
            payment_capture: 1,
        };

        console.log("📤 Sending to Razorpay:", options);

        const rOrder = await razorpay.orders.create(options);

        // Save razorpay order ID
        order.razorpayOrderId = rOrder.id;
        await order.save();

        res.json({
            key: process.env.RAZORPAY_KEY_ID,
            razorpayOrderId: rOrder.id,
            amount: rOrder.amount,
            currency: rOrder.currency,
        });
    } catch (err) {
        console.error("❌ Razorpay Create Order Error:", err); // <- ADD THIS LINE
        res.status(500).json({ message: err.message || "Razorpay error" });
    }
};

/**
 * POST /api/payment/razorpay/verify
 * req.body: { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId }
 */
export const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

        // generate signature on server the same way Razorpay does
        const generated_signature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest("hex");

        if (generated_signature !== razorpay_signature) {
            return res.status(400).json({ message: "Invalid signature" });
        }

        // signature valid -> mark order as paid and perform post-payment actions
        const order = await Order.findById(orderId);
        if (!order) return res.status(404).json({ message: "DB Order not found" });

        // avoid double processing
        if (order.status === "paid") {
            return res.status(200).json({ message: "Order already processed", order });
        }

        // Decrement stock for each item
        for (const item of order.orderItems) {
            const product = await Product.findById(item.product);
            if (product) {
                product.stock = Math.max(0, product.stock - item.qty);
                await product.save();
            }
        }

        order.status = "paid";
        order.paymentInfo = {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            paidAt: new Date(),
        };
        await order.save();

        // Clear user's cart
        await Cart.findOneAndUpdate({ user: order.user }, { items: [], totalPrice: 0 });

        // respond
        res.status(200).json({ message: "Payment verified and order updated", order });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/**
 * POST /api/payment/razorpay/webhook
 * Note: This endpoint should use raw body parser so signature verification uses exact payload.
 */
export const razorpayWebhook = async (req, res) => {
    try {
        const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
        const signature = req.headers["x-razorpay-signature"];
        const body = req.body.toString(); // raw string

        const expected = crypto.createHmac("sha256", secret).update(body).digest("hex");
        if (expected !== signature) {
            return res.status(400).json({ message: "Invalid webhook signature" });
        }

        const event = JSON.parse(body);
        console.log("🔔 Razorpay Webhook Event:", event.event);

        // Example: handle specific event
        if (event.event === "payment.captured") {
            // yahan tum DB update kar sakte ho
        }

        res.status(200).send("ok");
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

