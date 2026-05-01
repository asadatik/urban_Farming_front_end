"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import Navbar from "@/components/sections/Navbar";
import FooterSection from "@/components/sections/FooterSection";
import { FilterSidebar } from "@/components/modules/marketplace/FilterSidebar";
import { ProductCard } from "@/components/modules/marketplace/ProductCard";
import { ProductCardSkeleton } from "@/components/modules/marketplace/Skeletons";
import { CartDrawer } from "@/components/modules/marketplace/CartDrawer";
import { useMarketplace } from "@/hooks/useApi";
import { cn } from "@/lib/utils";

const DEFAULT = { search: "", category: undefined, minPrice: undefined, maxPrice: undefined, certifiedOnly: false, sortBy: "newest" };
type Filters = typeof DEFAULT;

export default function MarketplacePage() {
  const [filters, setFilters] = useState<Filters>(DEFAULT);
  const [search, setSearch]   = useState("");
  const [showMF, setShowMF]   = useState(false);

  const { data, isLoading } = useMarketplace({ ...filters, search: search || undefined });
  const products = data?.data ?? [];
  const total    = data?.meta?.total ?? products.length;

  const update = (f: Partial<Filters>) => setFilters(p => ({ ...p, ...f }));
  const reset  = () => { setFilters(DEFAULT); setSearch(""); };

  return (
    <div style={{ background: "#000", minHeight: "100vh" }}>
      <Navbar />
      <div className="pointer-events-none fixed inset-0 z-0"
        style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.025) 1px,transparent 1px)", backgroundSize: "32px 32px" }} />

      {/* Page header */}
      <div className="relative overflow-hidden pt-24 pb-14" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%,rgba(34,197,94,0.1) 0%,transparent 70%)" }} />
        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
          <motion.p initial={{ opacity:0,y:12 }} animate={{ opacity:1,y:0 }} className="mb-2 text-xs font-semibold uppercase tracking-widest"
            style={{ color:"#22c55e",fontFamily:"var(--font-dm)" }}>Marketplace</motion.p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <motion.h1 initial={{ opacity:0,y:14 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.1 }}
                className="text-4xl font-extrabold text-white md:text-5xl"
                style={{ fontFamily:"var(--font-jakarta)",letterSpacing:"-2px" }}>
                Organic <span style={{ color:"#22c55e" }}>Marketplace</span>
              </motion.h1>
              <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.2 }}
                className="mt-1 text-sm" style={{ color:"var(--text-3)",fontFamily:"var(--font-dm)" }}>
                {isLoading ? "Loading..." : `${total} certified products from local farmers`}
              </motion.p>
            </div>
            <motion.div initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.2 }} className="relative w-full sm:max-w-sm">
              <Search size={13} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color:"var(--text-4)" }} />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search produce, herbs, seeds..."
                className="w-full rounded-2xl border border-white/08 bg-white/03 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-zinc-700 outline-none backdrop-blur focus:border-white/16"
                style={{ fontFamily:"var(--font-dm)" }} />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-10 md:px-8">
        <div className="flex gap-7">
          {/* Desktop sidebar */}
          <div className="hidden lg:block">
            <FilterSidebar filters={filters as any} onChange={update as any} onReset={reset} />
          </div>

          <div className="flex-1 min-w-0">
            {/* Mobile filter toggle */}
            <button onClick={() => setShowMF(!showMF)}
              className={cn("mb-4 flex items-center gap-2 rounded-xl border px-4 py-2 text-sm transition-all lg:hidden",
                showMF ? "border-emerald-500/30 bg-emerald-500/08 text-emerald-400" : "border-white/08 text-zinc-500 hover:border-white/16 hover:text-zinc-300")}>
              <SlidersHorizontal size={13} />Filters
            </button>
            {showMF && (
              <div className="mb-5 lg:hidden">
                <FilterSidebar filters={filters as any} onChange={update as any} onReset={reset} />
              </div>
            )}

            {isLoading ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {Array(9).fill(0).map((_,i) => <ProductCardSkeleton key={i} />)}
              </div>
            ) : products.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-4 rounded-[28px] border border-white/06 py-24 text-center"
                style={{ background:"rgba(255,255,255,0.02)" }}>
                <span className="text-4xl">🌿</span>
                <p className="text-lg font-semibold text-zinc-400" style={{ fontFamily:"var(--font-jakarta)" }}>No products found</p>
                <p className="text-sm text-zinc-700">Try adjusting your filters or search terms.</p>
                <button onClick={reset} className="mt-1 rounded-xl border border-white/08 px-4 py-2 text-sm text-zinc-500 transition-all hover:border-white/16 hover:text-zinc-300">
                  Clear filters
                </button>
              </div>
            ) : (
              <motion.div layout className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {products.map((p, i) => <ProductCard key={p.id} produce={p} index={i} />)}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <CartDrawer />
      <FooterSection />
    </div>
  );
}
