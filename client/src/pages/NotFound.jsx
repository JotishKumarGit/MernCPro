import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center bg-light">
      {/* 404 Title */}
      <h1 className="display-1 fw-bold text-primary">404</h1>
      
      {/* Message */}
      <h2 className="mb-3">Oops! Page Not Found 🚧</h2>
      <p className="text-muted mb-4 px-3">
        The page you’re looking for doesn’t exist or has been moved.
      </p>

      {/* Home Button */}
      <Link to="/" className="btn btn-lg btn-primary rounded-pill shadow">
        ⬅️ Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
