"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Search, MapPin, Ruler, DollarSign, SlidersHorizontal, X, CheckCircle2, Loader2 } from "lucide-react";
import Navbar from "@/components/sections/Navbar";
import FooterSection from "@/components/sections/FooterSection";
import { useRentals } from "@/hooks/useApi";
import { useAuthStore } from "@/lib/stores/authStore";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { RentalSpace } from "@/types";

const SIZES = ["5sqm","10sqm","20sqm","50sqm"];
const PRICE_RANGES = [
  { label:"Any price", min:undefined, max:undefined },
  { label:"Under $30", min:undefined, max:30 },
  { label:"$30–$60",   min:30, max:60 },
  { label:"$60–$100",  min:60, max:100 },
  { label:"Over $100", min:100, max:undefined },
];

function RentalCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-[24px]" style={{ background:"linear-gradient(145deg,#0f172a,#0c1525)",border:"1px solid rgba(30,41,59,0.8)" }}>
      <div style={{ height:200,background:"linear-gradient(90deg,#1e293b 0%,#273548 50%,#1e293b 100%)",backgroundSize:"200% 100%",animation:"shimmer 1.8s linear infinite" }} />
      <div className="p-5 space-y-3">
        {[3,5,4].map((w,i) => <div key={i} style={{ height:12,width:`${w*18}%`,background:"#1e293b",borderRadius:6 }} />)}
      </div>
      <style>{`@keyframes shimmer{from{background-position:200% center}to{background-position:-200% center}}`}</style>
    </div>
  );
}

function BookingModal({ space, onClose }: { space: RentalSpace; onClose: () => void }) {
  const { isAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({ startDate:"", months:"1", notes:"" });

  if (!isAuthenticated) {
    return (
      <>
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" onClick={onClose} />
        <motion.div initial={{ opacity:0,scale:0.95,y:12 }} animate={{ opacity:1,scale:1,y:0 }} exit={{ opacity:0,scale:0.95 }}
          className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-[28px] p-8 text-center"
          style={{ background:"#0f172a",border:"1px solid rgba(30,41,59,0.8)" }}>
          <p className="mb-4 text-lg font-bold text-slate-100" style={{ fontFamily:"var(--font-jakarta)" }}>Sign in to book</p>
          <p className="mb-6 text-sm text-slate-400">Create an account or sign in to book this garden space.</p>
          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 rounded-xl border border-slate-800 py-2.5 text-sm text-slate-400 hover:border-slate-700 transition-all">Cancel</button>
            <Link href="/login" className="flex flex-1 items-center justify-center rounded-xl py-2.5 text-sm font-bold text-black transition-all"
              style={{ background:"linear-gradient(135deg,#10b981,#059669)" }}>Sign in</Link>
          </div>
        </motion.div>
      </>
    );
  }

  if (success) {
    return (
      <>
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" />
        <motion.div initial={{ opacity:0,scale:0.9 }} animate={{ opacity:1,scale:1 }}
          className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-[28px] p-8 text-center"
          style={{ background:"#0f172a",border:"1px solid rgba(16,185,129,0.2)",boxShadow:"0 0 40px rgba(16,185,129,0.1)" }}>
          <motion.div initial={{ scale:0 }} animate={{ scale:1 }} transition={{ type:"spring",stiffness:300,damping:20,delay:0.1 }}
            className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full"
            style={{ background:"rgba(16,185,129,0.15)",border:"2px solid rgba(16,185,129,0.3)" }}>
            <CheckCircle2 size={28} className="text-emerald-400" />
          </motion.div>
          <p className="mb-2 text-xl font-bold text-slate-100" style={{ fontFamily:"var(--font-jakarta)" }}>Booking Requested!</p>
          <p className="mb-6 text-sm text-slate-400">The vendor will confirm within 24 hours. Check your dashboard for updates.</p>
          <button onClick={onClose} className="w-full rounded-xl py-3 text-sm font-bold text-black"
            style={{ background:"linear-gradient(135deg,#10b981,#059669)" }}>Done</button>
        </motion.div>
      </>
    );
  }

  const handleBook = async () => {
    if (!form.startDate) { toast.error("Please select a start date."); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSuccess(true);
  };

  return (
    <>
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <motion.div initial={{ opacity:0,scale:0.95,y:12 }} animate={{ opacity:1,scale:1,y:0 }} exit={{ opacity:0,scale:0.95 }}
        className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-[28px] p-7"
        style={{ background:"#0f172a",border:"1px solid rgba(30,41,59,0.8)",boxShadow:"0 24px 60px rgba(0,0,0,0.5)" }}>
        <div className="mb-5 flex items-center justify-between">
          <h3 className="font-bold text-slate-100" style={{ fontFamily:"var(--font-jakarta)", fontSize:17 }}>Book This Space</h3>
          <button onClick={onClose} className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-800 text-slate-500 hover:text-slate-300"><X size={13} /></button>
        </div>
        <div className="mb-5 rounded-xl border border-slate-800/60 bg-slate-900/40 p-4">
          <p className="font-semibold text-slate-200 text-sm">{space.location}</p>
          <div className="mt-1 flex items-center gap-3 text-xs text-slate-500">
            <span>{space.size}</span><span>${space.price}/mo</span>
            {space.vendor && <span>{space.vendor.farmName}</span>}
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-400">Start Date *</label>
            <input type="date" value={form.startDate} onChange={e=>setForm(p=>({...p,startDate:e.target.value}))}
              className="input-field" style={{ colorScheme:"dark" }} />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-400">Duration (months)</label>
            <div className="flex gap-2">
              {["1","3","6","12"].map(m => (
                <button key={m} onClick={()=>setForm(p=>({...p,months:m}))}
                  className={cn("flex-1 rounded-xl border py-2 text-xs font-medium transition-all",form.months===m?"border-emerald-500/40 bg-emerald-500/10 text-emerald-300":"border-slate-800 text-slate-400 hover:border-slate-700")}>
                  {m}mo
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-400">Notes (optional)</label>
            <textarea value={form.notes} onChange={e=>setForm(p=>({...p,notes:e.target.value}))} rows={2} placeholder="Any special requirements..."
              className="input-field resize-none" />
          </div>
          <div className="flex items-center justify-between rounded-xl border border-slate-800/60 bg-slate-900/40 px-4 py-3">
            <span className="text-sm text-slate-400">Estimated total</span>
            <span className="font-bold text-slate-100" style={{ fontFamily:"var(--font-jakarta)" }}>
              ${(space.price * parseInt(form.months)).toFixed(2)}
            </span>
          </div>
        </div>
        <motion.button whileTap={{ scale:0.97 }} onClick={handleBook} disabled={loading}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-black disabled:opacity-70"
          style={{ background:"linear-gradient(135deg,#10b981,#059669)",boxShadow:"0 0 20px rgba(16,185,129,0.25)" }}>
          {loading ? <><Loader2 size={14} className="animate-spin" />Sending request...</> : "Request Booking"}
        </motion.button>
      </motion.div>
    </>
  );
}

function RentalCard({ space, index }: { space: RentalSpace; index: number }) {
  const [booking, setBooking] = useState(false);
  return (
    <>
      <motion.div initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} transition={{ delay:index*0.06,duration:0.4,ease:[0.4,0,0.2,1] }}
        className="group overflow-hidden rounded-[24px] transition-all duration-300"
        style={{ background:"linear-gradient(145deg,#0f172a,#0c1525)",border:"1px solid rgba(30,41,59,0.8)" }}
        onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.borderColor="rgba(34,197,94,0.25)";(e.currentTarget as HTMLDivElement).style.boxShadow="0 12px 40px rgba(0,0,0,0.5),0 0 24px rgba(34,197,94,0.08)";(e.currentTarget as HTMLDivElement).style.transform="translateY(-2px)";}}
        onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.borderColor="rgba(30,41,59,0.8)";(e.currentTarget as HTMLDivElement).style.boxShadow="none";(e.currentTarget as HTMLDivElement).style.transform="translateY(0)";}}
      >
        <div className="relative overflow-hidden" style={{ height:200 }}>
          <Image src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=75" alt={space.location}
            fill className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={e=>{(e.target as HTMLImageElement).src="https://placehold.co/600x200/0f172a/10b981?text=Garden+Plot";}} />
          <div style={{ position:"absolute",inset:0,background:"linear-gradient(to top,rgba(10,16,28,0.9) 0%,transparent 60%)" }} />
          <div className="absolute left-3 top-3">
            <span className={cn("pill text-2xs", space.availability ? "pill-success" : "pill-neutral")}>
              {space.availability ? "Available" : "Occupied"}
            </span>
          </div>
          <div className="absolute right-3 top-3 rounded-full border border-white/10 bg-black/40 px-2.5 py-1 backdrop-blur-sm">
            <span style={{ fontSize:11,color:"#fff",fontFamily:"var(--font-mono)" }}>${space.price}<span className="text-zinc-500">/mo</span></span>
          </div>
        </div>
        <div className="p-5">
          <h3 className="mb-1.5 font-bold text-slate-100 line-clamp-1" style={{ fontFamily:"var(--font-jakarta)",fontSize:14 }}>{space.location}</h3>
          {space.description && <p className="mb-3 text-xs leading-relaxed text-slate-500 line-clamp-2">{space.description}</p>}
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1 rounded-lg border border-slate-800/60 bg-slate-900/40 px-2.5 py-1 text-xs text-slate-400">
              <Ruler size={10} />{space.size}
            </span>
            {space.vendor?.farmLocation && (
              <span className="flex items-center gap-1 text-xs text-slate-500"><MapPin size={10} />{space.vendor.farmLocation}</span>
            )}
          </div>
          <motion.button whileTap={{ scale:0.97 }} onClick={()=>setBooking(true)} disabled={!space.availability}
            className="w-full rounded-xl py-2.5 text-sm font-bold transition-all disabled:cursor-not-allowed disabled:opacity-50"
            style={{ background:space.availability?"linear-gradient(135deg,#10b981,#059669)":"rgba(30,41,59,0.8)",color:space.availability?"#000":"#64748b" }}>
            {space.availability ? "Book This Plot" : "Currently Occupied"}
          </motion.button>
        </div>
      </motion.div>

      <AnimatePresence>
        {booking && <BookingModal space={space} onClose={()=>setBooking(false)} />}
      </AnimatePresence>
    </>
  );
}

export default function RentalsPage() {
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState(PRICE_RANGES[0]);
  const [availOnly, setAvailOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const { data, isLoading } = useRentals({
    location: search || undefined,
    minPrice: priceRange.min,
    maxPrice: priceRange.max,
    availability: availOnly ? true : undefined,
    limit: 12,
  });

  const spaces = data?.data ?? [];

  return (
    <div style={{ background:"#000",minHeight:"100vh" }}>
      <Navbar />
      <div className="pointer-events-none fixed inset-0 z-0" style={{ backgroundImage:"radial-gradient(rgba(255,255,255,0.03) 1px,transparent 1px)",backgroundSize:"32px 32px" }} />

      {/* Hero header */}
      <div className="relative overflow-hidden pt-24 pb-16" style={{ borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
        <div className="pointer-events-none absolute inset-0" style={{ background:"radial-gradient(ellipse 60% 50% at 50% 0%,rgba(34,197,94,0.1) 0%,transparent 70%)" }} />
        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8 lg:px-10 text-center">
          <motion.p initial={{ opacity:0,y:12 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.5 }}
            className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color:"#22c55e",fontFamily:"var(--font-dm)" }}>
            Garden Spaces
          </motion.p>
          <motion.h1 initial={{ opacity:0,y:16 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.6,delay:0.1 }}
            className="text-balance text-4xl font-extrabold text-white md:text-5xl lg:text-6xl" style={{ fontFamily:"var(--font-jakarta)",letterSpacing:"-2px" }}>
            Find Your Perfect<br /><span style={{ color:"#22c55e" }}>Garden Plot</span>
          </motion.h1>
          <motion.p initial={{ opacity:0,y:12 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.2,duration:0.5 }}
            className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed" style={{ color:"var(--text-2)",fontFamily:"var(--font-dm)" }}>
            Browse available urban garden spaces. Rent by the month, grow your own food, and become part of the movement.
          </motion.p>

          {/* Search bar */}
          <motion.div initial={{ opacity:0,y:12 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.3 }}
            className="mx-auto mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <MapPin size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by location (e.g. Gulshan, Dhaka)..."
                className="w-full rounded-2xl border border-white/10 bg-white/05 py-3 pl-10 pr-4 text-sm text-white placeholder:text-zinc-600 outline-none backdrop-blur focus:border-white/20"
                style={{ fontFamily:"var(--font-dm)" }} />
            </div>
            <button onClick={()=>setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/05 px-5 py-3 text-sm text-zinc-400 transition-all hover:border-white/20 hover:text-white backdrop-blur">
              <SlidersHorizontal size={14} />Filters
            </button>
          </motion.div>

          <AnimatePresence>
            {showFilters && (
              <motion.div initial={{ opacity:0,height:0 }} animate={{ opacity:1,height:"auto" }} exit={{ opacity:0,height:0 }}
                className="mx-auto mt-4 max-w-2xl overflow-hidden">
                <div className="rounded-2xl border border-white/08 bg-white/03 p-5 backdrop-blur text-left">
                  <div className="mb-4">
                    <p className="mb-2 text-xs font-medium uppercase tracking-wider text-zinc-500">Price Range</p>
                    <div className="flex flex-wrap gap-2">
                      {PRICE_RANGES.map(r => (
                        <button key={r.label} onClick={()=>setPriceRange(r)}
                          className={cn("rounded-xl border px-3 py-1.5 text-xs font-medium transition-all",
                            priceRange.label===r.label?"border-emerald-500/40 bg-emerald-500/10 text-emerald-300":"border-white/08 text-zinc-500 hover:border-white/16 hover:text-zinc-300")}>
                          {r.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button onClick={()=>setAvailOnly(!availOnly)}
                    className={cn("flex items-center gap-3 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all",
                      availOnly?"border-emerald-500/40 bg-emerald-500/10 text-emerald-300":"border-white/08 text-zinc-400 hover:border-white/16")}>
                    <div className={cn("h-4 w-8 rounded-full transition-all",availOnly?"bg-emerald-500":"bg-zinc-700")} style={{ position:"relative" }}>
                      <div className="absolute top-0.5 h-3 w-3 rounded-full bg-white transition-all" style={{ left:availOnly?"calc(100% - 14px)":"2px" }} />
                    </div>
                    Available spaces only
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Results */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 md:px-8 lg:px-10">
        {!isLoading && (
          <p className="mb-6 text-sm text-zinc-600" style={{ fontFamily:"var(--font-dm)" }}>
            {spaces.length} spaces found
          </p>
        )}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {isLoading
            ? Array(8).fill(0).map((_,i) => <RentalCardSkeleton key={i} />)
            : spaces.length === 0
            ? (
              <div className="col-span-full flex flex-col items-center justify-center gap-4 rounded-[28px] border border-white/06 py-24 text-center"
                style={{ background:"rgba(255,255,255,0.02)" }}>
                <div className="text-4xl">🌱</div>
                <p className="text-lg font-semibold text-zinc-300" style={{ fontFamily:"var(--font-jakarta)" }}>No spaces found</p>
                <p className="text-sm text-zinc-600">Try adjusting your location or removing filters.</p>
                <button onClick={()=>{setSearch("");setPriceRange(PRICE_RANGES[0]);setAvailOnly(false);}}
                  className="rounded-xl border border-white/10 px-4 py-2 text-sm text-zinc-400 transition-all hover:border-white/20 hover:text-white">
                  Clear filters
                </button>
              </div>
            )
            : spaces.map((space, i) => <RentalCard key={space.id} space={space} index={i} />)
          }
        </div>
      </div>
      <FooterSection />
    </div>
  );
}
