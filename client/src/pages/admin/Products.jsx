// src/pages/admin/Products.jsx
import React, { useEffect, useState } from "react";
import { Modal, Button, Table, Form, Card } from "react-bootstrap";
import api from "../../api/apiClient";
import AOS from "aos";
import "aos/dist/aos.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    image: "",
  });

  // ✅ Fetch all products
  const fetchProducts = async () => {
    try {
      const { data } = await api.get("/products?limit=20");
      setProducts(data.products || []);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  // ✅ Fetch categories for dropdown
  const fetchCategories = async () => {
    try {
      const { data } = await api.get("/categories");
      setCategories(data || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    AOS.init({ duration: 800 });
  }, []);

  // ✅ Handle form change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Save (create/update product)
  const handleSubmit = async () => {
    try {
      if (editingProduct) {
        await api.put(`/products/${editingProduct._id}`, formData);
      } else {
        await api.post("/products", formData);
      }
      fetchProducts();
      handleClose();
    } catch (err) {
      console.error("Error saving product:", err.response?.data || err);
    }
  };

  // ✅ Delete product
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await api.delete(`/products/${id}`);
        fetchProducts();
      } catch (err) {
        console.error("Error deleting product:", err.response?.data || err);
      }
    }
  };

  // ✅ Modal controls
  const handleShow = (product = null) => {
    setEditingProduct(product);
    setFormData(
      product || { name: "", description: "", price: "", stock: "", category: "", image: "" }
    );
    setShowModal(true);
  };

  const handleClose = () => {
    setEditingProduct(null);
    setFormData({ name: "", description: "", price: "", stock: "", category: "", image: "" });
    setShowModal(false);
  };

  return (
    <div className="container mt-4">
      <Card data-aos="fade-up">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="mb-0">Manage Products</h4>
            <Button variant="primary" onClick={() => handleShow()}>
              + Add Product
            </Button>
          </div>

          {/* Product Table */}
          <Table striped bordered hover responsive>
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Rating</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((prod, index) => (
                  <tr key={prod._id} data-aos="fade-up">
                    <td>{index + 1}</td>
                    <td>
                      <img src={prod.image} alt={prod.name} width="50" height="50" style={{ borderRadius: "8px" }} />
                    </td>
                    <td>{prod.name}</td>
                    <td>{prod.category?.name}</td>
                    <td>₹{prod.price}</td>
                    <td>{prod.stock}</td>
                    <td>{prod.averageRating?.toFixed(1) || 0}</td>
                    <td>
                      <Button variant="warning" size="sm" className="me-2" onClick={() => handleShow(prod)}>
                        Edit
                      </Button>
                      <Button variant="danger" size="sm" onClick={() => handleDelete(prod._id)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Modal */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editingProduct ? "Edit Product" : "Add Product"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={2} name="description" value={formData.description} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" name="price" value={formData.price} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control type="number" name="stock" value={formData.stock} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select name="category" value={formData.category} onChange={handleChange}>
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control type="text" name="image" value={formData.image} onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {editingProduct ? "Update" : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Products;
