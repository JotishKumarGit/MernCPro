// src/pages/userDashboard/UserTopbar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../stores/authStore";

export default function UserTopbar() {
  const { logout , user} = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="dashboard-topbar d-flex align-items-center justify-content-between px-3 py-2 border-bottom bg-light">
      <div className="d-flex align-items-center">
        <button className="btn btn-outline-secondary me-3 d-md-none" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSidebar">☰</button>
        <h5 className="mb-0">{user?.user.name}</h5>
      </div>

      <div className="d-flex align-items-center">
        <button className="btn btn-sm btn-outline-danger" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}
