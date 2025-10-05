// src/pages/userDashboard/UserOrders.jsx
import React, { useEffect, useState } from "react";
import api from "../../../api/apiClient";
import OrderDetailModal from "./OrderDetailModal";
import LoadingPage from "../../../components/ui/LoaderPage";

export default function UserOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);

  const load = async () => {
    try {
      setLoading(true);
      // backend route you posted: GET /my-orders within orders router
      const { data } = await api.get("/orders/my-orders");
      // backend may return either an array or { orders: [...] }
      setOrders(data.orders || data || []);
    } catch (err) {
      console.error("fetch orders error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) return <LoadingPage />;

  return (
    <div>
      <h5>My Orders</h5>
      {orders.length === 0 ? (
        <div className="text-center py-4">You have no orders yet.</div>
      ) : (
        <div className="table-responsive">
          <table className="table align-middle">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Order Id</th>
                <th>Total</th>
                <th>Status</th>
                <th>Placed</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o, i) => (
                <tr key={o._id}>
                  <td>{i + 1}</td>
                  <td>{o._id}</td>
                  <td>₹{o.totalAmount}</td>
                  <td>{o.status}</td>
                  <td>{new Date(o.createdAt).toLocaleString()}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary" onClick={() => setSelected(o)}>
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <OrderDetailModal order={selected} onClose={() => { setSelected(null); load(); }} />
    </div>
  );
}
