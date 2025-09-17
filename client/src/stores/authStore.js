import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),

  login: (user, token) => {
    localStorage.setItem("user", JSON.stringify(user)); // 👈 save user
    localStorage.setItem("token", token);
    set({ user, token, isAuthenticated: true });
  },

  setUser: (user, token) => {
    if (token) localStorage.setItem("token", token);
    set({user,token: token || localStorage.getItem("token"),isAuthenticated: true,
    });
  },

  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    set({ user: null, token: null, isAuthenticated: false });
  },

  // 🔹 NEW: initialize from localStorage on app load

  initializeAuth: () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      set({ user: JSON.parse(user), token, isAuthenticated: true });
    }
  },

}));


