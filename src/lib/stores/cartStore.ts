"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Produce } from "@/types";

export interface CartItem {
  produce: Produce;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (produce: Produce, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, quantity: number) => void;
  clearCart: () => void;
  setOpen: (v: boolean) => void;
  total: () => number;
  count: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (produce, quantity = 1) => {
        const existing = get().items.find((i) => i.produce.id === produce.id);
        if (existing) {
          set({ items: get().items.map((i) => i.produce.id === produce.id ? { ...i, quantity: i.quantity + quantity } : i) });
        } else {
          set({ items: [...get().items, { produce, quantity }] });
        }
      },
      removeItem: (id) => set({ items: get().items.filter((i) => i.produce.id !== id) }),
      updateQty: (id, quantity) => {
        if (quantity <= 0) { get().removeItem(id); return; }
        set({ items: get().items.map((i) => i.produce.id === id ? { ...i, quantity } : i) });
      },
      clearCart: () => set({ items: [] }),
      setOpen: (v) => set({ isOpen: v }),
      total: () => get().items.reduce((s, i) => s + i.produce.price * i.quantity, 0),
      count: () => get().items.reduce((s, i) => s + i.quantity, 0),
    }),
    { name: "uh-cart", partialize: (s) => ({ items: s.items }) }
  )
);
