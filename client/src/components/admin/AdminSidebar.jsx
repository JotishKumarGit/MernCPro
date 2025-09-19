// src/components/admin/AdminSidebar.jsx
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Package, ShoppingCart, Users } from "lucide-react";

export default function AdminSidebar({ isOpen, setIsOpen }) {
  const links = [
    { to: "/admin/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { to: "/admin/products", label: "Products", icon: <Package size={18} /> },
    { to: "/admin/orders", label: "Orders", icon: <ShoppingCart size={18} /> },
    { to: "/admin/users", label: "Users", icon: <Users size={18} /> },
  ];

  return (
    <div
      className={`bg-dark text-white p-3 border-end position-fixed h-100 
        ${isOpen ? "d-block" : "d-none d-md-block"}`}
      style={{ width: "240px", top: "0", left: "0", zIndex: 1000 }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>Admin</h4>
        <button className="btn btn-sm btn-outline-light d-md-none" onClick={() => setIsOpen(false)}>✖</button>
      </div>

      <ul className="nav flex-column">
        {links.map((link) => (
          <li key={link.to} className="nav-item mb-2">
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                `nav-link d-flex align-items-center gap-2 ${isActive ? "active text-warning" : "text-white"}`
              }
            >
              {link.icon} {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
