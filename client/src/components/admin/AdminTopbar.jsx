// src/components/admin/AdminTopbar.jsx
import { useThemeStore } from "../../stores/themeStore";

export default function AdminTopbar({ toggleSidebar }) {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <nav
      className={`navbar fixed-top shadow ${theme === "dark" ? "navbar-dark bg-dark" : "navbar-light bg-light"}`}
      style={{ zIndex: 1020 }}
    >
      <div className="container-fluid">
        <button className="btn btn-outline-secondary d-md-none" onClick={toggleSidebar}>
          ☰
        </button>

        <form className="d-none d-md-flex ms-3 flex-grow-1">
          <input className="form-control" type="search" placeholder="Search..." />
        </form>

        <div className="d-flex align-items-center gap-3">
          <button onClick={toggleTheme} className="btn btn-sm btn-outline-primary">
            {theme === "dark" ? "🌙" : "☀️"}
          </button>
          <img
            src="https://i.pravatar.cc/30"
            alt="profile"
            className="rounded-circle"
            width="32"
            height="32"
          />
          <span className="d-none d-md-block">{theme === "dark" ? "Dark Admin" : "Admin"}</span>
        </div>
      </div>
    </nav>
  );
}
