// src/components/admin/AdminAnalytics.jsx
import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const revenueData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Revenue',
      data: [4000, 3000, 4700, 6800, 5200, 6100],
      borderColor: 'rgba(75,192,192,1)',
      fill: false,
      tension: 0.4
    }
  ]
};

const usersData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'New Users',
      data: [100, 150, 200, 180, 220, 240],
      backgroundColor: 'rgba(54, 162, 235, 0.7)'
    }
  ]
};

const productsData = {
  labels: ['Shoes', 'T-Shirts', 'Laptops', 'Phones', 'Bags'],
  datasets: [
    {
      label: 'Sales',
      data: [500, 300, 800, 650, 400],
      backgroundColor: 'rgba(255, 99, 132, 0.6)'
    }
  ]
};

const metricCards = [
  { title: 'Total Revenue', value: '$28,100' },
  { title: 'Avg Order Value', value: '$140' },
  { title: 'Returning Users %', value: '43%' }
];

export default function AdminAnalytics() {
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Analytics Dashboard</h2>

      <div className="row mb-4">
        {metricCards.map((card, index) => (
          <div className="col-md-4 mb-3" key={index}>
            <div className="card text-white bg-primary h-100">
              <div className="card-body">
                <h5 className="card-title">{card.title}</h5>
                <p className="card-text display-6">{card.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <div className="card p-3">
            <h5>Revenue Trend</h5>
            <Line data={revenueData} />
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div className="card p-3">
            <h5>New Users per Month</h5>
            <Bar data={usersData} />
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-12">
          <div className="card p-3">
            <h5>Top 5 Selling Products</h5>
            <Bar data={productsData} />
          </div>
        </div>
      </div>
    </div>
  );
}
