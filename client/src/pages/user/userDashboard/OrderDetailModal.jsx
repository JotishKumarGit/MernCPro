// src/pages/userDashboard/OrderDetailModal.jsx
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import api from "../../../api/apiClient";

export default function OrderDetailModal({ order, onClose }) {
  const [localOrder, setLocalOrder] = useState(order);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLocalOrder(order);
  }, [order]);

  // fetch latest details (GET /orders/:id) — we'll add this server route below
  const fetchDetails = async (id) => {
    try {
      setLoading(true);
      const { data } = await api.get(`/orders/${id}`);
      setLocalOrder(data.order || data);
    } catch (err) {
      console.error("fetch order details", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (order) fetchDetails(order._id);
  }, [order]);

  if (!order) return null;

  return (
    <div className="modal show d-block" tabIndex={-1}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Order Details</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {loading ? (
              <div>Loading...</div>
            ) : (
              <>
                <p><strong>Order ID:</strong> {localOrder?._id}</p>
                <p><strong>Status:</strong> {localOrder?.status}</p>

                <h6>Items</h6>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Qty</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {localOrder?.orderItems?.map((it, idx) => (
                      <tr key={idx}>
                        <td>{it.product?.name || it.product}</td>
                        <td>{it.qty}</td>
                        <td>₹{it.product?.price || it.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <p><strong>Total:</strong> ₹{localOrder?.totalAmount}</p>

                <h6>Admin Notes</h6>
                <div className="p-2 border rounded">
                  {localOrder?.adminNotes || <small className="text-muted">No notes from admin yet.</small>}
                </div>
              </>
            )}
          </div>
          <div className="modal-footer">
            <Button variant="secondary" onClick={onClose}>Close</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
