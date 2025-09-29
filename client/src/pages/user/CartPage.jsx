import React, { useEffect } from "react";
import { useCartStore } from "../stores/cartStore";

export default function CartPage() {
  const {
    items,
    totalPrice,
    fetchCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    loading,
    error,
  } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  if (loading) return <p className="text-center mt-4">Loading cart...</p>;
  if (error) return <p className="text-danger text-center mt-4">{error}</p>;

  return (
    <div className="container mt-4">
      <h2>🛒 My Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {items.map((item) => (
            <div
              key={item.product._id}
              className="d-flex justify-content-between align-items-center border-bottom py-2"
            >
              <div>
                <h5>{item.product.name}</h5>
                <p>Price: ₹{item.product.price}</p>
              </div>
              <div>
                <button
                  className="btn btn-sm btn-outline-secondary me-2"
                  onClick={() =>
                    updateQuantity(item.product._id, item.quantity - 1)
                  }
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                {item.quantity}
                <button
                  className="btn btn-sm btn-outline-secondary ms-2"
                  onClick={() =>
                    updateQuantity(item.product._id, item.quantity + 1)
                  }
                >
                  +
                </button>
              </div>
              <div>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => removeFromCart(item.product._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="d-flex justify-content-between align-items-center mt-4">
            <h4>Total: ₹{totalPrice}</h4>
            <button className="btn btn-warning" onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
}
