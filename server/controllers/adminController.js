import User from '../models/User.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';

export const getAdminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalRevenueData = await Order.aggregate([
      { $match: { isPaid: true } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } },
    ]);
    const totalRevenue = totalRevenueData[0]?.total || 0;

    // Orders by status
    const orderStatusCounts = await Order.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);
    const statusSummary = {};
    orderStatusCounts.forEach((item) => {
      statusSummary[item._id] = item.count;
    });

    // Recent 5 orders
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('user', 'name email')
      .populate('orderItems.product', 'name price');

    // Low stock products
    const lowStockProducts = await Product.find({ stock: { $lt: 5 } }).select('name stock');

    res.status(200).json({
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue,
      orderStatusSummary: statusSummary,
      recentOrders,
      lowStockProducts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
