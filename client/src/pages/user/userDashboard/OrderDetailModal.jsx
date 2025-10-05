import React, { useEffect, useState, useRef } from "react";
import api from "../../../api/apiClient";
import { Button } from "react-bootstrap";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

/*
  Custom centered modal:
  - Receives `order` prop (object) and `onClose` callback.
  - Fetches latest order details from server when opened.
  - Centers using fixed positioning and flexible CSS.
  - Backdrop catch: clicking outside modal closes it.
  - ESC key closes it.
  - Contains "Download Invoice" which uses html2canvas + jsPDF.
*/
export default function OrderDetailModal({ order, onClose }) {
  const [localOrder, setLocalOrder] = useState(order);
  const [loading, setLoading] = useState(false);
  const modalRef = useRef(null);
  const invoiceRef = useRef(null);

  useEffect(() => setLocalOrder(order), [order]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // fetch single order details on open
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
    if (order?._id) fetchDetails(order._id);
  }, [order]);

  if (!order) return null;

  const onBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose?.();
    }
  };

  // Download invoice: capture invoiceRef DOM and save as PDF
  const handleDownloadInvoice = async () => {
    if (!invoiceRef.current) return;
    try {
      // scale to improve quality: increase scale factor
      const canvas = await html2canvas(invoiceRef.current, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width, canvas.height]
      });
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save(`invoice_${localOrder._id}.pdf`);
    } catch (err) {
      console.error("invoice download failed", err);
    }
  };

  return (
    <div className="custom-modal-backdrop show" onMouseDown={onBackdropClick} aria-modal="true" role="dialog">
      <div className="custom-modal" ref={modalRef} role="document">
        <div className="custom-modal-header">
          <h5 className="modal-title">Order Details</h5>
          <button className="btn btn-close" onClick={onClose} aria-label="Close"></button>
        </div>

        <div className="custom-modal-body">
          {loading ? (
            <div className="text-center py-4">Loading...</div>
          ) : (
            <>
              <div ref={invoiceRef} className="invoice-card p-3">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h6 className="mb-0">Order ID: <small className="text-muted">{localOrder?._id}</small></h6>
                    <small className="text-muted">Placed: {new Date(localOrder?.createdAt).toLocaleString()}</small>
                  </div>
                  <div className="text-end">
                    <strong>₹{localOrder?.totalAmount}</strong>
                    <div className="text-muted small">{localOrder?.status}</div>
                  </div>
                </div>

                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Qty</th>
                      <th className="text-end">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {localOrder?.orderItems?.map((it, idx) => (
                      <tr key={idx}>
                        <td>{it.product?.name || it.product}</td>
                        <td>{it.qty}</td>
                        <td className="text-end">₹{it.product?.price || it.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="d-flex justify-content-between mt-3">
                  <div>
                    <h6 className="mb-0">Customer</h6>
                    <small className="text-muted">{localOrder?.shippingAddress?.name || localOrder?.customerName}</small>
                    <div className="small text-muted">{localOrder?.shippingAddress?.address}</div>
                  </div>
                  <div className="text-end">
                    <div className="small text-muted">Payment</div>
                    <div className="fw-semibold">{localOrder?.paymentMethod || "—"}</div>
                  </div>
                </div>
              </div>

              <div className="mt-3">
                <h6>Admin Notes</h6>
                <div className="p-2 border rounded">
                  {localOrder?.adminNotes || <small className="text-muted">No notes from admin yet.</small>}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="custom-modal-footer">
          <Button variant="secondary" onClick={onClose}>Close</Button>
          <Button variant="primary" onClick={handleDownloadInvoice}>Download Invoice</Button>
        </div>
      </div>
    </div>
  );
}
