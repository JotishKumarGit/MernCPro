// src/components/layout/UserDashboardLayout.jsx
import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../stores/authStore";
import { FaBars, FaUserCircle, FaSignOutAlt, FaCog, FaBox, FaUser } from "react-icons/fa";
import './styles.css';

export default function DashboardLayout() {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();
    const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="dashboard-wrapper d-flex flex-column vh-100">
            {/* 🔹 Fixed Topbar */}
            <nav className="dashboard-topbar navbar navbar-light bg-white shadow-sm px-3 py-2 fixed-top d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-3">
                    {/* Toggle Sidebar Button for Mobile */}
                    <button
                        className="btn btn-outline-secondary d-lg-none"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#dashboardSidebar"
                        onClick={() => setIsOffcanvasOpen(!isOffcanvasOpen)}
                    >
                        <FaBars />
                    </button>
                    <h5 className="mb-0 fw-semibold">User Dashboard</h5>
                </div>

                {/* Profile Avatar in Topbar */}
                <div className="dropdown">
                    <button
                        className="btn btn-light d-flex align-items-center gap-2 dropdown-toggle border-0"
                        id="userDropdown"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <img
                            src={
                                user?.profilePic ||
                                "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                            }
                            alt="avatar"
                            width={36}
                            height={36}
                            className="rounded-circle border"
                        />
                        <span className="fw-medium d-none d-md-inline">{user?.name || "User"}</span>
                    </button>
                    <ul
                        className="dropdown-menu dropdown-menu-end shadow-sm"
                        aria-labelledby="userDropdown"
                    >
                        <li>
                            <button
                                className="dropdown-item d-flex align-items-center gap-2"
                                onClick={() => navigate("/user/dashboard")}
                            >
                                <FaUser /> Profile
                            </button>
                        </li>
                        <li>
                            <button
                                className="dropdown-item d-flex align-items-center gap-2"
                                onClick={() => navigate("/user/dashboard/settings")}
                            >
                                <FaCog /> Settings
                            </button>
                        </li>
                        <li><hr className="dropdown-divider" /></li>
                        <li>
                            <button
                                className="dropdown-item text-danger d-flex align-items-center gap-2"
                                onClick={handleLogout}
                            >
                                <FaSignOutAlt /> Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* 🔹 Sidebar + Main Area */}
            <div className="d-flex flex-grow-1 overflow-hidden" style={{ paddingTop: "60px" }}>
                {/* Sidebar (Offcanvas for Mobile, Fixed for Desktop) */}
                <div
                    className="offcanvas-lg offcanvas-start bg-dark text-white sidebar transition-all"
                    tabIndex="-1"
                    id="dashboardSidebar"
                    aria-labelledby="dashboardSidebarLabel"
                >
                    <div className="offcanvas-header border-bottom border-secondary">
                        <h5 className="offcanvas-title" id="dashboardSidebarLabel">
                            <img
                                src={
                                    user?.profilePic ||
                                    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                                }
                                alt="avatar"
                                width={48}
                                height={48}
                                className="rounded-circle border me-2"
                            />
                            {user?.name || "User"}
                        </h5>
                        <button
                            type="button"
                            className="btn-close btn-close-white text-reset"
                            data-bs-dismiss="offcanvas"
                            aria-label="Close"
                        ></button>
                    </div>

                    <div className="offcanvas-body p-0 d-flex flex-column">
                        <ul className="nav flex-column mt-3">
                            <li className="nav-item">
                                <NavLink
                                    to="/user/dashboard"
                                    end
                                    className={({ isActive }) =>
                                        "nav-link px-4 py-2 d-flex align-items-center gap-2 " +
                                        (isActive ? "active-nav" : "text-white-50")
                                    }
                                >
                                    <FaUser /> Profile
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    to="/user/dashboard/orders"
                                    className={({ isActive }) =>
                                        "nav-link px-4 py-2 d-flex align-items-center gap-2 " +
                                        (isActive ? "active-nav" : "text-white-50")
                                    }
                                >
                                    <FaBox /> My Orders
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    to="/user/dashboard/settings"
                                    className={({ isActive }) =>
                                        "nav-link px-4 py-2 d-flex align-items-center gap-2 " +
                                        (isActive ? "active-nav" : "text-white-50")
                                    }
                                >
                                    <FaCog /> Settings
                                </NavLink>
                            </li>
                        </ul>

                        <div className="mt-auto p-3 border-top border-secondary">
                            <button
                                onClick={handleLogout}
                                className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2"
                            >
                                <FaSignOutAlt /> Logout
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content (scrollable only) */}
                <main className="dashboard-content flex-grow-1 overflow-auto p-3 bg-light">
                    <Outlet />
                </main>
            </div>

        </div>
    );
}


