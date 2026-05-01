"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingCart, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/stores/cartStore";
import { toast } from "sonner";

export function CartDrawer() {
  const { items, isOpen, setOpen, removeItem, updateQty, total, count, clearCart } = useCartStore();
  const n = count();

  return (
    <>
      {/* Floating cart button */}
      <AnimatePresence>
        {n > 0 && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-2xl px-5 py-3 text-sm font-semibold text-white shadow-2xl"
            style={{ background: "linear-gradient(135deg,#10b981,#059669)", boxShadow: "0 0 28px rgba(16,185,129,0.45), 0 8px 24px rgba(0,0,0,0.4)" }}
          >
            <ShoppingCart size={16} />
            <span>{n} item{n !== 1 ? "s" : ""}</span>
            <span className="rounded-lg bg-white/20 px-2 py-0.5 text-xs font-bold">${total().toFixed(2)}</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col"
            style={{
              background: "linear-gradient(180deg,#0d1829 0%,#020617 100%)",
              borderLeft: "1px solid rgba(30,41,59,0.8)",
              boxShadow: "-8px 0 40px rgba(0,0,0,0.5)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800/60 px-6 py-4">
              <div className="flex items-center gap-2">
                <ShoppingBag size={16} className="text-emerald-400" />
                <span className="font-semibold text-slate-100" style={{ fontFamily: "var(--font-jakarta)" }}>Your Cart</span>
                {n > 0 && <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs font-bold text-emerald-400">{n}</span>}
              </div>
              <button onClick={() => setOpen(false)} className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-800 text-slate-500 transition-all hover:border-slate-700 hover:text-slate-300">
                <X size={14} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl" style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.15)" }}>
                    <ShoppingCart size={24} className="text-slate-600" />
                  </div>
                  <p className="text-sm font-medium text-slate-400">Your cart is empty</p>
                  <p className="text-xs text-slate-600">Add some organic produce to get started.</p>
                  <button onClick={() => setOpen(false)} className="mt-2 text-xs font-medium text-emerald-500 hover:text-emerald-400">
                    Browse marketplace →
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map((item) => (
                    <motion.div
                      key={item.produce.id}
                      layout
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 16 }}
                      className="flex gap-3 rounded-2xl border border-slate-800/60 bg-slate-900/40 p-3"
                    >
                      <div
                        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-xs font-bold text-white"
                        style={{ background: "linear-gradient(135deg,#0f172a,#1e293b)", border: "1px solid #1e293b" }}
                      >
                        🌿
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-sm font-medium text-slate-200">{item.produce.name}</p>
                        <p className="text-xs text-slate-500">{item.produce.vendor?.farmName}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center gap-1 rounded-lg border border-slate-800 bg-slate-900">
                            <button onClick={() => updateQty(item.produce.id, item.quantity - 1)} className="flex h-6 w-6 items-center justify-center text-slate-400 transition-colors hover:text-slate-200">
                              <Minus size={10} />
                            </button>
                            <span className="w-6 text-center text-xs font-semibold text-slate-200">{item.quantity}</span>
                            <button onClick={() => updateQty(item.produce.id, item.quantity + 1)} className="flex h-6 w-6 items-center justify-center text-slate-400 transition-colors hover:text-slate-200">
                              <Plus size={10} />
                            </button>
                          </div>
                          <span className="text-sm font-bold text-slate-100">${(item.produce.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                      <button onClick={() => removeItem(item.produce.id)} className="self-start text-slate-600 transition-colors hover:text-red-400">
                        <Trash2 size={13} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-slate-800/60 px-6 py-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Subtotal</span>
                  <span className="text-lg font-bold text-slate-100" style={{ fontFamily: "var(--font-jakarta)" }}>${total().toFixed(2)}</span>
                </div>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { setOpen(false); window.location.href = "/checkout"; }}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-bold text-white transition-all"
                  style={{ background: "linear-gradient(135deg,#10b981,#059669)", boxShadow: "0 0 20px rgba(16,185,129,0.3)" }}
                >
                  Proceed to Checkout <ArrowRight size={14} />
                </motion.button>
                <button onClick={clearCart} className="w-full text-xs text-slate-600 transition-colors hover:text-slate-400">
                  Clear cart
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
