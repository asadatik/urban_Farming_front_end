"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, MapPin, ShoppingCart, Eye } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/lib/stores/cartStore";
import type { Produce } from "@/types";

interface ProductCardProps {
  produce: Produce;
  index?: number;
}

const CATEGORY_COLORS: Record<string, string> = {
  VEGETABLES: "#10b981",
  FRUITS:     "#f43f5e",
  HERBS:      "#84cc16",
  SEEDS:      "#f59e0b",
  TOOLS:      "#3b82f6",
  OTHER:      "#8b5cf6",
};

export function ProductCard({ produce, index = 0 }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const setOpen = useCartStore((s) => s.setOpen);
  const accent = CATEGORY_COLORS[produce.category] ?? "#10b981";

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(produce);
    toast.success(`${produce.name} added to cart`, {
      action: { label: "View cart", onClick: () => setOpen(true) },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: [0.4, 0, 0.2, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={`/marketplace/${produce.id}`} className="group block">
        <motion.div
          animate={{ scale: hovered ? 1.02 : 1, y: hovered ? -3 : 0 }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          className="relative overflow-hidden rounded-[24px]"
          style={{
            border: `1px solid ${hovered ? `${accent}35` : "rgba(30,41,59,0.8)"}`,
            background: "linear-gradient(145deg,#0f172a 0%,#0c1525 100%)",
            boxShadow: hovered
              ? `0 0 0 1px ${accent}18, 0 12px 40px rgba(0,0,0,0.5), 0 0 28px ${accent}12`
              : "0 1px 3px rgba(0,0,0,0.4)",
            transition: "border-color 0.25s, box-shadow 0.25s",
          }}
        >
          {/* Top shine */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px" style={{ background: `linear-gradient(90deg,transparent,${hovered ? accent + "30" : "rgba(255,255,255,0.04)"},transparent)` }} />

          {/* Image */}
          <div className="relative overflow-hidden" style={{ height: 200 }}>
            <Image
              src={produce.imageUrl ?? `https://placehold.co/600x400/0f172a/10b981?text=${encodeURIComponent(produce.name)}`}
              alt={produce.name}
              fill
              className="object-cover transition-transform duration-500"
              style={{ transform: hovered ? "scale(1.06)" : "scale(1)" }}
            />

            {/* Image overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />

            {/* Cert badge */}
            {produce.certificationStatus === "APPROVED" && (
              <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/20 px-2 py-1 backdrop-blur-sm">
                <ShieldCheck size={10} className="text-emerald-400" />
                <span className="text-2xs font-medium text-emerald-300">Organic</span>
              </div>
            )}

            {/* Category pill */}
            <div className="absolute left-3 top-3 rounded-full px-2 py-1" style={{ background: `${accent}20`, border: `1px solid ${accent}30` }}>
              <span className="text-2xs font-medium" style={{ color: accent }}>{produce.category}</span>
            </div>

            {/* Hover CTA overlay */}
            <AnimatePresence>
              {hovered && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-x-0 bottom-3 flex justify-center gap-2 px-4"
                >
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddToCart}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl py-2 text-xs font-semibold text-white backdrop-blur-sm transition-all"
                    style={{ background: "rgba(16,185,129,0.85)", boxShadow: "0 0 16px rgba(16,185,129,0.4)" }}
                  >
                    <ShoppingCart size={12} />
                    Add to Cart
                  </motion.button>
                  <motion.div
                    whileTap={{ scale: 0.95 }}
                    className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-xl backdrop-blur-sm"
                    style={{ background: "rgba(15,23,42,0.8)", border: "1px solid rgba(30,41,59,0.8)" }}
                  >
                    <Eye size={13} className="text-slate-300" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Body */}
          <div className="p-4">
            <div className="mb-1 flex items-start justify-between gap-2">
              <h3 className="line-clamp-1 text-sm font-semibold text-slate-100 transition-colors group-hover:text-emerald-300" style={{ fontFamily: "var(--font-jakarta)" }}>
                {produce.name}
              </h3>
              <span className="shrink-0 text-base font-bold text-slate-100" style={{ fontFamily: "var(--font-jakarta)" }}>
                ${produce.price.toFixed(2)}
              </span>
            </div>

            <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-slate-500">{produce.description}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="flex h-5 w-5 items-center justify-center rounded-md text-2xs font-bold text-white" style={{ background: accent }}>
                  {produce.vendor?.farmName?.[0] ?? "F"}
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-300">{produce.vendor?.farmName ?? "Local Farm"}</p>
                </div>
              </div>
              {produce.vendor?.farmLocation && (
                <div className="flex items-center gap-1 text-slate-500">
                  <MapPin size={10} />
                  <span className="text-2xs">{produce.vendor.farmLocation.split(",")[0]}</span>
                </div>
              )}
            </div>

            {/* Stock indicator */}
            <div className="mt-3">
              <div className="mb-1 flex justify-between text-2xs text-slate-600">
                <span>{produce.availableQuantity} units left</span>
                <span>{produce.availableQuantity < 20 ? "⚠ Low stock" : "In stock"}</span>
              </div>
              <div className="h-0.5 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-0.5 rounded-full transition-all"
                  style={{
                    width: `${Math.min(100, (produce.availableQuantity / 200) * 100)}%`,
                    background: produce.availableQuantity < 20 ? "#f59e0b" : accent,
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
