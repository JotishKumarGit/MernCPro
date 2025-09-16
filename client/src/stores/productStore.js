import { create } from "zustand";
import api from "../api/apiClient";

export const useProductStore = create((set) => ({
  products: [],
  loading: false,

  fetchProducts: async () => {
    set({ loading: true });
    try {
      const res = await api.get("/products");
      set({ products: res.data });
    } catch (err) {
      console.error(err);
    } finally {
      set({ loading: false });
    }
  }
}));
