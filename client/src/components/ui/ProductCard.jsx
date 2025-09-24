import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  // Backend se image path `/uploads/...` aa raha hai, usko baseURL ke sath use karo
  const imageSrc = product.image
    ? `http://localhost:5000${product.image}`
    : "/placeholder.png";

  return (
    <div className="card h-100 shadow-sm">
      <Link to={`/product/${product._id}`}>
        <img
          src={imageSrc}
          className="card-img-top"
          alt={product.name}
          style={{ height: 180, objectFit: "cover" }}
        />
      </Link>
      <div className="card-body d-flex flex-column">
        <h6 className="card-title">{product.name}</h6>
        <p className="mb-2 text-muted">₹{product.price}</p>
        <div className="mt-auto d-flex gap-2">
          <Link to={`/product/${product._id}`} className="btn btn-sm btn-outline-primary w-100">
            View
          </Link>
          <button className="btn btn-sm btn-primary w-100">Add</button>
        </div>
      </div>
    </div>
  );
}
