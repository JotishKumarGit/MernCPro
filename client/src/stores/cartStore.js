import { create } from "zustand";

export const useCartStore = create(set => ({
  items: JSON.parse(localStorage.getItem("cart")) || [],

  addToCart: (product, qty = 1) => set(state => {
    const existing = state.items.find(i => i._id === product._id);
    let updatedCart;
    if (existing) {
      updatedCart = state.items.map(i =>
        i._id === product._id ? { ...i, qty: i.qty + qty } : i
      );
    } else {
      updatedCart = [...state.items, { ...product, qty }];
    }
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    return { items: updatedCart };
  }),

  removeFromCart: (id) => set(state => {
    const updatedCart = state.items.filter(i => i._id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    return { items: updatedCart };
  }),

  clearCart: () => {
    localStorage.removeItem("cart");
    set({ items: [] });
  }
}));
