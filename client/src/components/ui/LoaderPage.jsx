import React, { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";

// Bootstrap spinner + custom animation
export default function LoadingPage() {
  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center vh-100 bg-dark text-light"
    >
      {/* Outer Circle Animation */}
      <div
        className="position-relative"
        style={{ width: "150px", height: "150px" }}
        data-aos="zoom-in"
      >
        {/* Bootstrap spinner in center */}
        <div
          className="spinner-border text-info position-absolute top-50 start-50 translate-middle"
          style={{ width: "4rem", height: "4rem" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>

        {/* Animated Glowing Circle */}
        <div className="glowing-circle"></div>
      </div>

      {/* Loading Text */}
      <h2
        className="mt-4 fw-bold"
        data-aos="fade-up"
        data-aos-delay="400"
      >
        Please Wait...
      </h2>
      <p className="text-secondary" data-aos="fade-up" data-aos-delay="700">
        Loading your experience
      </p>
    </div>
  );
}
