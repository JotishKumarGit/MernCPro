import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
dotenv.config();
import { connectDb } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import productsRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = process.env.PORT || 8080;

//  Middlewares
app.use(cors({
  origin: 'http://localhost:5173',  // frontend origin
  credentials: true                // to allow sending cookies
}));
app.use(express.json());          // to parse JSON request body
app.use(cookieParser());           // to parse cookies
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// Make /uploads folder public
app.use("/uploads", express.static("uploads"));

//  route 
app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use('/api/auth', authRoutes); 
app.use('/api/products', productsRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);

// connect db 
connectDb();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

