import axios from "axios";

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api/v1";

const api = axios.create({ baseURL: BASE, timeout: 12000, headers: { "Content-Type": "application/json" } });

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem("uh-auth");
      const token = raw ? JSON.parse(raw)?.state?.token : null;
      if (token) config.headers.Authorization = `Bearer ${token}`;
    } catch { /* storage unavailable */ }
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 && typeof window !== "undefined") {
      // Ensure in-memory Zustand state is reset before redirecting.
      void import("@/lib/stores/authStore")
        .then((m) => m.useAuthStore.getState().logout())
        .catch(() => undefined);

      localStorage.removeItem("uh-auth");
      localStorage.removeItem("uh-cart");
      document.cookie = "uh-auth=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default api;
