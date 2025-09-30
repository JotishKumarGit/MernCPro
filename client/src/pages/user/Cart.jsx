import React, { useEffect } from "react";
import { useCartStore } from "../../stores/cartStore";
import Loading from '../../components/ui/LoaderPage';

export default function CartPage() {
  const { items, totalPrice, fetchCart, updateQuantity, removeFromCart, clearCart, loading, error, } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  if (loading) return <p className="text-center mt-4"><Loading /></p>;
  if (error) return <p className="text-danger text-center mt-4">{error}</p>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center fw-bold">🛒 My Shopping Cart</h2>

      {items.length === 0 ? (
        <p className="text-center">Your cart is empty</p>
      ) : (
        <>
          {/* 🟢 Table */}
          <div className="table-responsive shadow-sm rounded">
            <table className="table align-middle">
              <thead className="table-dark">
                <tr>
                  <th scope="col">Image</th>
                  <th scope="col">Product</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Subtotal</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.product._id}>
                    <td>
                      <img
                        src={item.product.image || "/placeholder.png"}
                        alt={item.product.name}
                        width="70"
                        className="rounded"
                      />
                    </td>
                    <td>
                      <h6 className="mb-1">{item.product.name}</h6>
                    </td>
                    <td>₹{item.product.price}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() =>
                            updateQuantity(item.product._id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="mx-2 fw-bold">{item.quantity}</span>
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() =>
                            updateQuantity(item.product._id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>₹{item.product.price * item.quantity}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => removeFromCart(item.product._id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 🟢 Total + Actions */}
          <div className="d-flex justify-content-between align-items-center mt-4">
            <h4 className="fw-bold">Total: ₹{totalPrice}</h4>
            <div>
              <button className="btn btn-outline-warning me-2" onClick={clearCart}>
                Clear Cart
              </button>
              <button className="btn btn-success checkout-btn">
                Checkout →
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
