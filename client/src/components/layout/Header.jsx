import { Link } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { useCartStore } from "../../stores/cartStore";
import { useThemeStore } from "../../stores/themeStore";
import { useEffect } from "react";

function Header() {
  const { user, logout } = useAuthStore();
  const { cartItems } = useCartStore();
  const { theme, toggleTheme } = useThemeStore();

  // apply theme to body
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <>
      {/* 🔹 Topbar */}
      <div className="bg-light border-bottom small py-1 px-3 d-flex justify-content-between align-items-center">
        <span>
          📧 support@trade4export.com | 📞 +91 98765 43210
        </span>
        <span>
          <Link to="/help" className="text-decoration-none text-muted">
            Help
          </Link>
        </span>
      </div>

      {/* 🔹 Main Navbar */}
      <nav
        className={`navbar navbar-expand-lg shadow-sm py-3 ${
          theme === "dark" ? "navbar-dark bg-dark" : "navbar-light bg-white"
        } px-3`}
      >
        <div className="container-fluid">
          {/* Brand */}
          <Link className="navbar-brand fw-bold text-primary fs-4" to="/">
            Trade4Export
          </Link>

          {/* Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            {/* 🔹 Center Search Bar */}
            <form className="d-flex mx-auto my-2 my-lg-0" style={{ maxWidth: "400px", flex: 1 }}>
              <input
                className="form-control rounded-start-pill"
                type="search"
                placeholder="Search products..."
                aria-label="Search"
              />
              <button className="btn btn-primary rounded-end-pill" type="submit">
                🔍
              </button>
            </form>

            {/* 🔹 Right Side */}
            <ul className="navbar-nav ms-auto align-items-center">
              {/* Categories */}
              <li className="nav-item dropdown me-3">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  Categories
                </a>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/category/electronics">Electronics</Link></li>
                  <li><Link className="dropdown-item" to="/category/fashion">Fashion</Link></li>
                  <li><Link className="dropdown-item" to="/category/home">Home & Living</Link></li>
                </ul>
              </li>

              {/* Cart */}
              <li className="nav-item me-3">
                <Link className="nav-link position-relative" to="/cart">
                  🛒
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartItems?.length || 0}
                  </span>
                </Link>
              </li>

              {/* Theme Toggle */}
              <li className="nav-item me-3">
                <button className="btn btn-outline-secondary btn-sm" onClick={toggleTheme}>
                  {theme === "dark" ? "🌙" : "☀️"}
                </button>
              </li>

              {/* Auth */}
              {!user ? (
                <>
                  <li className="nav-item">
                    <Link className="btn btn-outline-primary me-2" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="btn btn-primary" to="/register">
                      Register
                    </Link>
                  </li>
                </>
              ) : (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                      alt="avatar"
                      width="30"
                      height="30"
                      className="rounded-circle"
                    />
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <Link className="dropdown-item" to="/profile">Profile</Link>
                    </li>
                    {user?.role === "admin" && (
                      <li>
                        <Link className="dropdown-item" to="/admin/dashboard">
                          Admin Panel
                        </Link>
                      </li>
                    )}
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button className="dropdown-item" onClick={logout}>Logout</button>
                    </li>
                  </ul>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
