"use client";
import { motion } from "framer-motion";
import { SlidersHorizontal, RotateCcw, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MarketplaceFilters } from "@/hooks/useMarketplace";

const CATEGORIES = [
  { value: "",           label: "All Products" },
  { value: "VEGETABLES", label: "Vegetables" },
  { value: "FRUITS",     label: "Fruits" },
  { value: "HERBS",      label: "Herbs" },
  { value: "SEEDS",      label: "Seeds" },
  { value: "TOOLS",      label: "Tools" },
  { value: "OTHER",      label: "Other" },
];

const PRICE_RANGES = [
  { label: "Any price",   min: undefined, max: undefined },
  { label: "Under $5",    min: undefined, max: 5 },
  { label: "$5 – $10",    min: 5,         max: 10 },
  { label: "$10 – $20",   min: 10,        max: 20 },
  { label: "Over $20",    min: 20,        max: undefined },
];

const SORT_OPTIONS = [
  { value: "newest",     label: "Newest first" },
  { value: "price_asc",  label: "Price: Low → High" },
  { value: "price_desc", label: "Price: High → Low" },
];

interface FilterSidebarProps {
  filters: MarketplaceFilters;
  onChange: (f: Partial<MarketplaceFilters>) => void;
  onReset: () => void;
}

export function FilterSidebar({ filters, onChange, onReset }: FilterSidebarProps) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      className="w-64 shrink-0"
    >
      <div
        className="sticky top-[80px] rounded-[24px] p-5"
        style={{
          background: "linear-gradient(145deg,#0f172a,#0c1525)",
          border: "1px solid rgba(30,41,59,0.8)",
          boxShadow: "0 1px 3px rgba(0,0,0,0.4)",
        }}
      >
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={14} className="text-emerald-400" />
            <span className="text-sm font-semibold text-slate-200" style={{ fontFamily: "var(--font-jakarta)" }}>Filters</span>
          </div>
          <button onClick={onReset} className="flex items-center gap-1 text-xs text-slate-500 transition-colors hover:text-slate-300">
            <RotateCcw size={11} />Reset
          </button>
        </div>

        <div className="space-y-6">
          {/* Category */}
          <div>
            <p className="mb-2.5 text-xs font-medium uppercase tracking-wider text-slate-500">Category</p>
            <div className="space-y-1">
              {CATEGORIES.map((c) => (
                <button
                  key={c.value}
                  onClick={() => onChange({ category: c.value || undefined })}
                  className={cn(
                    "flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition-all duration-150",
                    (filters.category ?? "") === c.value
                      ? "bg-emerald-500/12 text-emerald-300"
                      : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                  )}
                  style={
                    (filters.category ?? "") === c.value
                      ? { border: "1px solid rgba(16,185,129,0.2)", background: "rgba(16,185,129,0.08)" }
                      : { border: "1px solid transparent" }
                  }
                >
                  <span>{c.label}</span>
                  {(filters.category ?? "") === c.value && (
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" style={{ boxShadow: "0 0 6px #34d399" }} />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="h-px bg-slate-800/60" />

          {/* Price range */}
          <div>
            <p className="mb-2.5 text-xs font-medium uppercase tracking-wider text-slate-500">Price Range</p>
            <div className="space-y-1">
              {PRICE_RANGES.map((r) => {
                const active = filters.minPrice === r.min && filters.maxPrice === r.max;
                return (
                  <button
                    key={r.label}
                    onClick={() => onChange({ minPrice: r.min, maxPrice: r.max })}
                    className={cn(
                      "flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition-all duration-150",
                      active ? "text-emerald-300" : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                    )}
                    style={active ? { border: "1px solid rgba(16,185,129,0.2)", background: "rgba(16,185,129,0.08)" } : { border: "1px solid transparent" }}
                  >
                    {r.label}
                    {active && <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" style={{ boxShadow: "0 0 6px #34d399" }} />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="h-px bg-slate-800/60" />

          {/* Sort */}
          <div>
            <p className="mb-2.5 text-xs font-medium uppercase tracking-wider text-slate-500">Sort By</p>
            <div className="space-y-1">
              {SORT_OPTIONS.map((s) => (
                <button
                  key={s.value}
                  onClick={() => onChange({ sortBy: s.value as MarketplaceFilters["sortBy"] })}
                  className={cn(
                    "flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition-all duration-150",
                    filters.sortBy === s.value ? "text-emerald-300" : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                  )}
                  style={filters.sortBy === s.value ? { border: "1px solid rgba(16,185,129,0.2)", background: "rgba(16,185,129,0.08)" } : { border: "1px solid transparent" }}
                >
                  {s.label}
                  {filters.sortBy === s.value && <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" style={{ boxShadow: "0 0 6px #34d399" }} />}
                </button>
              ))}
            </div>
          </div>

          <div className="h-px bg-slate-800/60" />

          {/* Certified toggle */}
          <div>
            <button
              onClick={() => onChange({ certifiedOnly: !filters.certifiedOnly })}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl px-3 py-3 transition-all duration-200",
                filters.certifiedOnly
                  ? "text-emerald-300"
                  : "text-slate-400 hover:text-slate-200"
              )}
              style={
                filters.certifiedOnly
                  ? { border: "1px solid rgba(16,185,129,0.25)", background: "rgba(16,185,129,0.1)" }
                  : { border: "1px solid rgba(30,41,59,0.6)", background: "rgba(15,23,42,0.4)" }
              }
            >
              <ShieldCheck size={15} className={filters.certifiedOnly ? "text-emerald-400" : "text-slate-500"} />
              <div className="text-left">
                <p className="text-sm font-medium">Certified Organic Only</p>
                <p className="text-2xs text-slate-500">USDA / EU verified vendors</p>
              </div>
              <div
                className="ml-auto h-5 w-9 rounded-full transition-all duration-200"
                style={{ background: filters.certifiedOnly ? "#10b981" : "#1e293b" }}
              >
                <div
                  className="m-0.5 h-4 w-4 rounded-full bg-white shadow transition-all duration-200"
                  style={{ transform: filters.certifiedOnly ? "translateX(16px)" : "translateX(0)" }}
                />
              </div>
            </button>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
