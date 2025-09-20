// src/pages/admin/Dashboard.jsx
import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import RevenueChart from "../../components/admin/RevenueChart";
import StatsCards from "../../components/admin/StatsCards";

function Dashboard() {
  return (

      <div className="container-fluid">
        <h2 className="mb-3 pt-2" data-aos="fade-down">📊 Admin Dashboard</h2>
        <p data-aos="fade-right">Welcome, Admin! Manage your store here 🚀</p>

        <StatsCards />

        <div className="row mt-4">
          <div className="col-md-12" data-aos="fade-up">
            <RevenueChart />
          </div>
        </div>
      </div>
  );
}

export default Dashboard;
