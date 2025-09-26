import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      mirror: false,
    });

    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
        setTimeout(() => {
          AOS.refresh();
        }, 100);
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
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!product) {
    return <h2 className="text-center mt-5">Product not found</h2>;
  }

  const imageSrc = product.image
    ? `http://localhost:5000${product.image}`
    : "/placeholder.png";

  const categoryName =
    typeof product.category === "object"
      ? product.category?.name
      : product.category;

  const description =
    typeof product.description === "string"
      ? product.description
      : JSON.stringify(product.description || "No description available");

  return (
    <>
      {/* 🔥 Header Section */}
      <div
        className="text-white text-center d-flex flex-column justify-content-center align-items-center"
        style={{
          minHeight: "50vh",
          background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)),
                      url(${imageSrc}) center/cover no-repeat`,
        }}
      >
        <h1
          className="fw-bold display-4"
          data-aos="fade-down"
          data-aos-delay="200"
        >
          {product.name}
        </h1>
        <p
          className="lead mt-3"
          data-aos="fade-up"
          data-aos-delay="400"
          style={{ maxWidth: "600px" }}
        >
          {description.length > 120
            ? description.substring(0, 120) + "..."
            : description}
        </p>
      </div>

      {/* 🔥 Product Details Section */}
      <div className="container py-5" data-aos="fade-up">
        <div className="row g-4">
          <div className="col-md-6 d-flex justify-content-center">
            <img
              src={imageSrc}
              alt={product.name}
              className="img-fluid rounded shadow-lg"
              style={{ maxHeight: "400px", objectFit: "contain" }}
              data-aos="zoom-in"
            />
          </div>

          <div className="col-md-6" data-aos="fade-left">
            <h2 className="fw-bold">{product.name || "Unnamed Product"}</h2>
            <p className="text-muted">Category: {categoryName || "N/A"}</p>
            <h4 className="text-primary mb-3">₹{product.price || 0}</h4>
            <p className="mb-4">{description}</p>

            <div className="d-flex gap-3">
              <button className="btn btn-primary btn-lg rounded-pill">
                Add to Cart
              </button>
              <Link
                to="/"
                className="btn btn-outline-secondary btn-lg rounded-pill"
              >
                Back to Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
