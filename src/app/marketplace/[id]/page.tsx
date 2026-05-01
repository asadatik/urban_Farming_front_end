"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, ShieldCheck, MapPin, Star, ShoppingCart, Zap, Leaf, Droplets, Sun, Package, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/sections/Navbar";
import { CartDrawer } from "@/components/modules/marketplace/CartDrawer";
import { useProduceDetail } from "@/hooks/useApi";
import { useCartStore } from "@/lib/stores/cartStore";
import { cn } from "@/lib/utils";

const NUTRIENTS = [
  { icon: Leaf,     label: "Vitamins",  value: "A, C, K",   color: "#22c55e" },
  { icon: Droplets, label: "Minerals",  value: "Iron, Ca",  color: "#3b82f6" },
  { icon: Sun,      label: "Calories",  value: "18/100g",   color: "#f59e0b" },
  { icon: Package,  label: "Protein",   value: "1.2g",      color: "#8b5cf6" },
];

const GALLERY_FALLBACKS = [
  "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&q=80",
  "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&q=80",
  "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
  "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80",
];

export default function ProductDetailPage() {
  const { id }                  = useParams<{ id: string }>();
  const { data, isLoading, isError } = useProduceDetail(id);
  const [qty, setQty]           = useState(1);
  const [imgIdx, setImgIdx]     = useState(0);
  const [zoomed, setZoomed]     = useState(false);
  const { addItem, setOpen }    = useCartStore();

  const handleCart = () => {
    if (!data) return;
    addItem(data, qty);
    toast.success(`${qty}× ${data.name} added to cart`, { action: { label: "View Cart", onClick: () => setOpen(true) } });
  };

  if (isLoading) return (
    <div style={{ background:"#000",minHeight:"100vh" }}>
      <Navbar />
      <div className="mx-auto max-w-5xl px-4 pt-28 md:px-8">
        <div className="flex flex-col gap-10 lg:flex-row animate-pulse">
          <div className="flex-1 space-y-3">
            <div className="aspect-[4/3] w-full rounded-[24px]" style={{ background:"rgba(255,255,255,0.04)" }} />
            <div className="grid grid-cols-4 gap-2">{Array(4).fill(0).map((_,i)=><div key={i} className="aspect-square rounded-xl" style={{ background:"rgba(255,255,255,0.04)" }} />)}</div>
          </div>
          <div className="flex-1 space-y-4 pt-2">{Array(6).fill(0).map((_,i)=><div key={i} className="h-5 rounded-lg" style={{ background:"rgba(255,255,255,0.04)",width:`${80-i*8}%` }} />)}</div>
        </div>
      </div>
    </div>
  );

  if (isError || !data) return (
    <div style={{ background:"#000",minHeight:"100vh" }}>
      <Navbar />
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="mb-4 text-2xl font-bold text-zinc-400" style={{ fontFamily:"var(--font-jakarta)" }}>Product not found</p>
          <Link href="/marketplace" className="flex items-center justify-center gap-2 text-sm" style={{ color:"#22c55e" }}><ArrowLeft size={13} />Back to marketplace</Link>
        </div>
      </div>
    </div>
  );

  const images = [data.imageUrl ?? GALLERY_FALLBACKS[0], ...GALLERY_FALLBACKS.slice(1)];

  return (
    <div style={{ background:"#000",minHeight:"100vh" }}>
      <Navbar />
      <div className="pointer-events-none fixed inset-0 z-0"
        style={{ backgroundImage:"radial-gradient(rgba(255,255,255,0.025) 1px,transparent 1px)",backgroundSize:"32px 32px" }} />

      <div className="relative z-10 mx-auto max-w-5xl px-4 pb-24 pt-24 md:px-8">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm" style={{ color:"var(--text-3)",fontFamily:"var(--font-dm)" }}>
          <Link href="/marketplace" className="flex items-center gap-1.5 transition-colors hover:text-white"><ArrowLeft size={13} />Marketplace</Link>
          <span>/</span><span className="text-zinc-500">{data.category}</span>
          <span>/</span><span className="truncate text-zinc-400">{data.name}</span>
        </div>

        <div className="flex flex-col gap-10 lg:flex-row">
          {/* Gallery */}
          <motion.div initial={{ opacity:0,x:-16 }} animate={{ opacity:1,x:0 }} transition={{ duration:0.4 }} className="flex-1 min-w-0">
            <div className="group relative cursor-zoom-in overflow-hidden rounded-[28px]"
              style={{ border:"1px solid rgba(255,255,255,0.06)",background:"#0a0a0a",aspectRatio:"4/3" }}
              onMouseEnter={() => setZoomed(true)} onMouseLeave={() => setZoomed(false)}>
              <Image src={images[imgIdx]} alt={data.name} fill className="object-cover transition-transform duration-500"
                style={{ transform: zoomed ? "scale(1.07)" : "scale(1)" }}
                onError={e => { (e.target as HTMLImageElement).src = GALLERY_FALLBACKS[0]; }} priority />
              <div style={{ position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,0.4),transparent 50%)" }} />
              {data.certificationStatus === "APPROVED" && (
                <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-black/60 px-3 py-1.5 backdrop-blur-sm">
                  <ShieldCheck size={11} style={{ color:"#22c55e" }} />
                  <span className="text-xs font-semibold" style={{ color:"#22c55e" }}>Certified Organic</span>
                </div>
              )}
              <button onClick={() => setImgIdx(i => (i - 1 + images.length) % images.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-black/60 text-white backdrop-blur transition-all hover:bg-black/80">
                <ChevronLeft size={15} />
              </button>
              <button onClick={() => setImgIdx(i => (i + 1) % images.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-black/60 text-white backdrop-blur transition-all hover:bg-black/80">
                <ChevronRight size={15} />
              </button>
            </div>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {images.map((src, i) => (
                <button key={i} onClick={() => setImgIdx(i)}
                  className="relative aspect-square overflow-hidden rounded-xl transition-all duration-200"
                  style={{ border:`2px solid ${i===imgIdx?"#22c55e":"rgba(255,255,255,0.06)"}`,boxShadow:i===imgIdx?"0 0 12px rgba(34,197,94,0.3)":"none" }}>
                  <Image src={src} alt="" fill className="object-cover" onError={e => { (e.target as HTMLImageElement).src = GALLERY_FALLBACKS[0]; }} />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity:0,x:16 }} animate={{ opacity:1,x:0 }} transition={{ duration:0.4,delay:0.1 }}
            className="flex w-full flex-col gap-5 lg:w-[400px] lg:shrink-0">
            <div>
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="rounded-full px-2.5 py-1 text-xs font-medium"
                  style={{ background:"rgba(34,197,94,0.1)",border:"1px solid rgba(34,197,94,0.2)",color:"#22c55e" }}>{data.category}</span>
                <span className={cn("text-xs",data.availableQuantity > 0 ? "pill-success" : "pill-error")} style={{ display:"inline-flex",alignItems:"center",padding:"2px 10px",borderRadius:9999,fontSize:"0.65rem",fontWeight:500 }}>
                  {data.availableQuantity > 0 ? `${data.availableQuantity} in stock` : "Out of stock"}
                </span>
              </div>
              <h1 className="text-3xl font-extrabold text-white" style={{ fontFamily:"var(--font-jakarta)",letterSpacing:"-1px" }}>{data.name}</h1>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-4xl font-black text-white" style={{ fontFamily:"var(--font-mono)" }}>${Number(data.price).toFixed(2)}</span>
                <span className="text-sm" style={{ color:"var(--text-3)" }}>per unit</span>
              </div>
            </div>

            <p className="text-[15px] leading-relaxed" style={{ color:"var(--text-2)",fontFamily:"var(--font-dm)" }}>
              {data.description ?? "Fresh, locally grown and certified organic produce from trusted urban farmers."}
            </p>

            {/* Nutrients */}
            <div>
              <p className="mb-2.5 text-xs font-semibold uppercase tracking-wider" style={{ color:"var(--text-3)" }}>Nutritional Highlights</p>
              <div className="grid grid-cols-2 gap-2">
                {NUTRIENTS.map(({ icon: Icon, label, value, color }) => (
                  <div key={label} className="flex items-center gap-2.5 rounded-xl border border-white/05 bg-white/02 p-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                      style={{ background:`${color}14`,border:`1px solid ${color}22` }}>
                      <Icon size={14} style={{ color }} />
                    </div>
                    <div>
                      <p className="text-xs" style={{ color:"var(--text-3)" }}>{label}</p>
                      <p className="text-xs font-semibold text-zinc-300">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Farmer */}
            {data.vendor && (
              <div className="rounded-[18px] border border-white/06 bg-white/02 p-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider" style={{ color:"var(--text-3)" }}>Meet the Farmer</p>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-black"
                    style={{ background:"linear-gradient(135deg,#22c55e,#16a34a)" }}>
                    {(data.vendor.farmName ?? "F")[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-white">{data.vendor.farmName}</p>
                      <div className="flex items-center gap-1"><Star size={11} className="fill-amber-400 text-amber-400" /><span className="text-xs text-zinc-500">4.8</span></div>
                    </div>
                    {data.vendor.farmLocation && (
                      <div className="mt-0.5 flex items-center gap-1"><MapPin size={10} style={{ color:"var(--text-4)" }} /><span className="text-xs" style={{ color:"var(--text-3)" }}>{data.vendor.farmLocation}</span></div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Qty + CTA */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-sm" style={{ color:"var(--text-3)" }}>Quantity</span>
                <div className="flex items-center rounded-xl border border-white/08 bg-white/03">
                  <button onClick={() => setQty(q => Math.max(1, q - 1))} className="flex h-9 w-9 items-center justify-center text-zinc-400 transition-colors hover:text-white">−</button>
                  <span className="w-8 text-center text-sm font-bold text-white">{qty}</span>
                  <button onClick={() => setQty(q => Math.min(data.availableQuantity, q + 1))} className="flex h-9 w-9 items-center justify-center text-zinc-400 transition-colors hover:text-white">+</button>
                </div>
                <span className="text-sm font-bold text-zinc-300">${(Number(data.price) * qty).toFixed(2)}</span>
              </div>

              <motion.button whileTap={{ scale:0.97 }} onClick={handleCart} disabled={data.availableQuantity === 0}
                className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl py-4 text-sm font-bold text-black disabled:opacity-40"
                style={{ background:"linear-gradient(135deg,#22c55e,#16a34a)",boxShadow:"0 0 24px rgba(34,197,94,0.3)" }}>
                <motion.div animate={{ scale:[1,1.5,1.5],opacity:[0.5,0,0] }} transition={{ duration:2.5,repeat:Infinity }}
                  className="pointer-events-none absolute inset-0 rounded-2xl" style={{ border:"2px solid rgba(34,197,94,0.5)" }} />
                <Zap size={14} />Buy Now · ${(Number(data.price) * qty).toFixed(2)}
              </motion.button>

              <motion.button whileTap={{ scale:0.97 }} onClick={handleCart} disabled={data.availableQuantity === 0}
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/08 bg-white/02 py-3 text-sm font-medium text-zinc-300 transition-all hover:border-white/14 hover:text-white disabled:opacity-40">
                <ShoppingCart size={14} />Add to Cart
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
      <CartDrawer />
    </div>
  );
}
