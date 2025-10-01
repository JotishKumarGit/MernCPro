import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useCartStore } from "../../stores/cartStore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, mirror: false });

    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
        setTimeout(() => AOS.refresh(), 100);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!product) {
    return <h2 className="text-center mt-5">Product not found</h2>;
  }
  const imageSrc = product.image ? `http://localhost:5000${product.image}` : "/placeholder.png";
  const categoryName = typeof product.category === "object" ? product.category?.name : product.category;
  const description = typeof product.description === "string" ? product.description : JSON.stringify(product.description || "No description available");

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart 🛒`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };

  return (
    <>
      {/* 🔥 Hero Section */}
      <div
        className="text-white text-center d-flex flex-column justify-content-center align-items-center shadow-lg" style={{ minHeight: "50vh", background: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)),url(${imageSrc}) center/cover no-repeat`, }}>
        <h1 className="fw-bold display-4" data-aos="fade-down" data-aos-delay="200" > {product.name}</h1>
        <p className="lead mt-3" data-aos="fade-up" data-aos-delay="400" style={{ maxWidth: "700px" }} >
          {description.length > 120 ? description.substring(0, 120) + "..." : description}
        </p>
      </div>

      {/* 🔥 Main Section */}
      <div className="container py-5" data-aos="fade-up">
        <div className="row g-5 align-items-center">
          {/* Left: Product Image */}
          <div className="col-md-6 text-center">
            <img src={imageSrc} alt={product.name} className="img-fluid rounded-4 shadow-lg border" style={{ maxHeight: "450px", objectFit: "contain" }} data-aos="zoom-in" />
          </div>

          {/* Right: Product Info */}
          <div className="col-md-6" data-aos="fade-left">
            <h2 className="fw-bold mb-3">{product.name}</h2>
            <p className="text-muted mb-2"> Category:{" "}
              <span className="fw-semibold">{categoryName || "N/A"}</span>
            </p>

            <div className="mb-3 text-warning">
              ⭐⭐⭐⭐☆ <small className="text-muted">(120 reviews)</small>
            </div>
            <h3 className="text-success fw-bold mb-3">₹{product.price || 0}</h3>
            <p className="text-secondary mb-4" style={{ lineHeight: "1.6" }}>{description}</p>

            <p className={`fw-semibold ${product.stock > 0 ? "text-success" : "text-danger"}`}> {product.stock > 0 ? "✔ In Stock" : "❌ Out of Stock"}</p>

            {/* Buttons */}
            <div className="d-flex flex-wrap gap-3 mt-4">
              <button className="btn btn-primary btn-lg rounded-pill px-4 shadow-sm" disabled={product.stock === 0} onClick={handleAddToCart}>
                🛒 Add to Cart
              </button>
              <button className="btn btn-outline-success btn-lg rounded-pill px-4 shadow-sm">
                ❤️ Wishlist
              </button>
              <Link to="/" className="btn btn-outline-secondary btn-lg rounded-pill px-4 shadow-sm" > ⬅ Back to Products </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 🔥 Related Products */}
      <div className="bg-light py-5 mt-5">
        <div className="container" data-aos="fade-up">
          <h3 className="fw-bold mb-4">You may also like</h3>
          <div className="row g-4">
            {[1, 2, 3].map((item) => (
              <div className="col-md-4" key={item}>
                <div className="card shadow-sm border-0 rounded-4 h-100">
                  <img src="/placeholder.png" className="card-img-top rounded-top-4" alt="Related Product" />
                  <div className="card-body text-center">
                    <h5 className="card-title">Sample Product {item}</h5>
                    <p className="text-success fw-semibold">₹999</p>
                    <button className="btn btn-sm btn-primary rounded-pill"> View Details </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
