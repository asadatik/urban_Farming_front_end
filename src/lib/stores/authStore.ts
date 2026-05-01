"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: User, token: string) => void;
  logout: () => void;
}

function syncCookie(token: string | null, role?: string | null) {
  if (typeof document === "undefined") return;
  if (token) {
    const exp = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie =
      `uh-auth=${encodeURIComponent(
        JSON.stringify({ state: { token, user: { role: role ?? "" } } })
      )};expires=${exp};path=/;SameSite=Lax`;
  } else {
    document.cookie = "uh-auth=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
  }
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setUser: (user, token) => {
        syncCookie(token, user?.role);
        set({ user, token, isAuthenticated: true });
      },
      logout: () => {
        syncCookie(null);
        if (typeof localStorage !== "undefined") {
          localStorage.removeItem("uh-auth");
          localStorage.removeItem("uh-cart");
        }
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    { name: "uh-auth", partialize: (s) => ({ user: s.user, token: s.token, isAuthenticated: s.isAuthenticated }) }
  )
);
