import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

export default function ProductCard({ product }) {
  const imageSrc = product.image
    ? `http://localhost:5000${product.image}`
    : "/placeholder.png";

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,   // ✅ animate ek hi baar hoga aur product hide nahi hoga
      mirror: false // ✅ scroll back karne par dobara hide nahi hoga
    });
  }, []);

  return (
    <div
      className="card h-100 shadow-lg border-0 rounded-3 product-card"
      data-aos="fade-up"
    >
      {/* Image Section */}
      <Link to={`/product/${product._id}`} className="card-img-container">
        <img
          src={imageSrc}
          className="card-img-top product-img"
          alt={product.name}
        />
      </Link>

      {/* Card Body */}
      <div className="card-body d-flex flex-column text-center">
        <h6 className="card-title fw-bold text-truncate">{product.name}</h6>
        <p className="mb-3 text-muted fs-6">₹{product.price}</p>

        <div className="mt-auto d-flex gap-2">
          <Link
            to={`/product/${product._id}`}
            className="btn btn-sm btn-outline-primary w-100 rounded-pill"
          >
            View
          </Link>
          <button className="btn btn-sm btn-primary w-100 rounded-pill">
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
