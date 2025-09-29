import { create } from "zustand";
import api from './../api/apiClient'; // 

export const useCartStore = create((set) => ({
  items: [],
  totalPrice: 0,
  loading: false,
  error: null,

  // 🟢 Fetch Cart
  fetchCart: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.get("/cart");
      set({ items: data.items, totalPrice: data.totalPrice, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || "Failed to fetch cart", loading: false });
    }
  },

  // 🟢 Add to Cart
  addToCart: async (productId, qty = 1) => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.post("/cart/add", { productId, quantity: qty });
      set({ items: data.items, totalPrice: data.totalPrice, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || "Failed to add item", loading: false });
    }
  },

  // ✏️ Update quantity
  updateQuantity: async (productId, qty) => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.put("/cart/update", { productId, quantity: qty });
      set({ items: data.items, totalPrice: data.totalPrice, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || "Failed to update item", loading: false });
    }
  },

  // ❌ Remove item
  removeFromCart: async (productId) => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.delete(`/cart/remove/${productId}`);
      set({ items: data.items, totalPrice: data.totalPrice, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || "Failed to remove item", loading: false });
    }
  },

  // 🗑 Clear cart
  clearCart: async () => {
    set({ loading: true, error: null });
    try {
      await api.delete("/cart/clear");
      set({ items: [], totalPrice: 0, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || "Failed to clear cart", loading: false });
    }
  },
}));
