import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useThemeStore } from "../../stores/themeStore";
import "./AdminSidebar.css";

function AdminSidebar({ isOpen, toggleSidebar }) {
  const { theme } = useThemeStore();
  const location = useLocation();

  const linkClass = (path) =>
    `nav-link d-flex align-items-center gap-2 px-3 py-2 rounded ${
      location.pathname === path
        ? "active-link"
        : theme === "dark"
        ? "text-light"
        : "text-muted"
    }`;

  return (
    <>
      {/* Hamburger for mobile */}
      <button
        className="btn btn-outline-secondary d-md-none m-2 position-fixed"
        onClick={toggleSidebar}
        style={{ top: 10, left: 10, zIndex: 1052 }}
      >
        ☰
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="sidebar-overlay d-md-none"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`admin-sidebar ${theme} ${isOpen ? "open" : ""}`}>
        <h5 className="text-center text-primary mt-3 mb-4">🛠️ Admin Panel</h5>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link
              to="/admin/dashboard"
              className={linkClass("/admin/dashboard")}
              onClick={toggleSidebar}
            >
              📊 <span>Dashboard</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/admin/products"
              className={linkClass("/admin/products")}
              onClick={toggleSidebar}
            >
              🛍️ <span>Products</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/admin/categories"
              className={linkClass("/admin/categories")}
              onClick={toggleSidebar}
            >
              🗂️ <span>Categories</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/admin/orders"
              className={linkClass("/admin/orders")}
              onClick={toggleSidebar}
            >
              📦 <span>Orders</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/admin/users"
              className={linkClass("/admin/users")}
              onClick={toggleSidebar}
            >
              👤 <span>Users</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default AdminSidebar;
