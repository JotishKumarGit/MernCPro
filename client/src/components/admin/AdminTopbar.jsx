// src/components/admin/AdminTopbar.jsx
import { useThemeStore } from "../../stores/themeStore";
import { CiDark } from "react-icons/ci";
import { MdOutlineLightMode } from "react-icons/md";
import { useAuthStore } from '../../stores/authStore';

export default function AdminTopbar({ toggleSidebar }) {
  const { theme, toggleTheme } = useThemeStore();

  const { user, logout, isAuthenticated } = useAuthStore();

  // console.log(user);

  return (
    <nav
      className={`d-flex justify-content-between navbar fixed-top shadow ${theme === "dark" ? "navbar-dark bg-dark" : "navbar-light bg-light"}`}
      style={{ zIndex: 1020 }}
    >
      <div className="container-fluid">
        <button className="btn btn-outline-secondary d-md-none" onClick={toggleSidebar}>☰</button>

        <h2 className="" data-aos="fade-down">📊</h2>

        <div className="d-flex align-items-center gap-3">
          <span onClick={toggleTheme} className=" btn-outline-primary rounded-pill">
            {theme === "dark" ? <CiDark size={28} /> : <MdOutlineLightMode size={28} />}
          </span>
          <img src={user?.profilePic || 'https://i.pravatar.cc/30'} alt="profile" className="rounded-circle" width="32" height="32" />
        </div>
      </div>
    </nav>
  );
}
