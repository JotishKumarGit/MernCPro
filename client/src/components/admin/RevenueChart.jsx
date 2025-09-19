// src/components/admin/RevenueChart.jsx
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = [
  { month: "Jan", revenue: 4000 },
  { month: "Feb", revenue: 3000 },
  { month: "Mar", revenue: 5000 },
  { month: "Apr", revenue: 7000 },
];

export default function RevenueChart() {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title mb-3">Revenue</h5>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke="#6c757d" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#0d6efd" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
