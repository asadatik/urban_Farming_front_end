"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DashboardShell } from "@/components/shared/DashboardShell";
import { BentoCard } from "@/components/shared/BentoCard";
import { Plus, MapPin, X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Space { id:string; location:string; size:string; price:number; availability:boolean; description:string; }

const MOCK: Space[] = [
  { id:"s1", location:"Rooftop A · Gulshan-1", size:"10sqm", price:45, availability:true,  description:"Sunny south-facing plot with water access." },
  { id:"s2", location:"Plot B-1 · Dhanmondi",  size:"20sqm", price:80, availability:true,  description:"Large corner plot ideal for vegetables." },
  { id:"s3", location:"Terrace C · Mirpur",    size:"5sqm",  price:25, availability:false, description:"Compact balcony space, herbs only." },
];

const SIZES = ["5sqm","10sqm","20sqm","50sqm"];
const EMPTY = { location:"", size:"10sqm", price:"", availability:true, description:"" };

export default function VendorSpacesPage() {
  const [spaces, setSpaces] = useState(MOCK);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(EMPTY);

  const toggle = (id: string) => {
    setSpaces(prev => prev.map(s => s.id === id ? { ...s, availability: !s.availability } : s));
    toast.success("Availability updated.");
  };

  const handleSave = () => {
    if (!form.location || !form.price) { toast.error("Location and price are required."); return; }
    setSpaces(prev => [{ id:`s${Date.now()}`, ...form, price: parseFloat(form.price) }, ...prev]);
    setOpen(false);
    setForm(EMPTY);
    toast.success("Space listed successfully.");
  };

  return (
    <DashboardShell role="VENDOR" title="Rental Spaces" subtitle="Manage your garden plot listings">
      <div className="space-y-4">
        <div className="flex justify-end">
          <motion.button whileTap={{ scale:0.97 }} onClick={() => setOpen(true)}
            className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-black"
            style={{ background:"linear-gradient(135deg,#10b981,#059669)", boxShadow:"0 0 16px rgba(16,185,129,0.25)" }}
          >
            <Plus size={14} />Add Space
          </motion.button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {spaces.map((s, i) => (
            <motion.div key={s.id} initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.07 }}
              className="relative overflow-hidden rounded-[20px] border border-slate-800/80 p-5 transition-all duration-200 hover:border-slate-700/80"
              style={{ background:"linear-gradient(145deg,#0f172a,#0c1525)" }}
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.04),transparent)" }} />
              <div className="mb-3 flex items-start justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background:"rgba(16,185,129,0.12)", border:"1px solid rgba(16,185,129,0.2)" }}>
                  <MapPin size={15} className="text-emerald-400" />
                </div>
                <button
                  onClick={() => toggle(s.id)}
                  className="flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium transition-all"
                  style={{ borderColor: s.availability ? "rgba(16,185,129,0.3)" : "rgba(30,41,59,0.8)", background: s.availability ? "rgba(16,185,129,0.1)" : "transparent", color: s.availability ? "#6ee7b7" : "#94a3b8" }}
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.availability ? "#10b981" : "#475569" }} />
                  {s.availability ? "Available" : "Rented"}
                </button>
              </div>
              <h3 className="mb-1 font-semibold text-slate-100" style={{ fontFamily:"var(--font-jakarta)", fontSize:14 }}>{s.location}</h3>
              <p className="mb-3 text-xs text-slate-500 leading-relaxed">{s.description}</p>
              <div className="flex items-center justify-between text-xs">
                <span className="rounded-lg border border-slate-800 bg-slate-900/50 px-2.5 py-1 text-slate-400">{s.size}</span>
                <span className="font-bold text-slate-200" style={{ fontFamily:"var(--font-jakarta)" }}>${s.price}<span className="font-normal text-slate-500">/mo</span></span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} onClick={() => setOpen(false)} className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ x:"100%" }} animate={{ x:0 }} exit={{ x:"100%" }} transition={{ type:"spring", stiffness:300, damping:30 }}
              className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col"
              style={{ background:"linear-gradient(180deg,#0d1829,#020617)", borderLeft:"1px solid rgba(30,41,59,0.8)" }}
            >
              <div className="flex items-center justify-between border-b border-slate-800/60 px-6 py-4">
                <h2 className="font-semibold text-slate-100" style={{ fontFamily:"var(--font-jakarta)" }}>Add Rental Space</h2>
                <button onClick={() => setOpen(false)} className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-800 text-slate-500 hover:text-slate-300"><X size={13} /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {[
                  { label:"Location / Plot Name", key:"location", placeholder:"e.g. Rooftop A · Gulshan" },
                  { label:"Monthly Price ($)", key:"price", type:"number", placeholder:"0.00" },
                  { label:"Description", key:"description", placeholder:"Brief description of the space..." },
                ].map(({ label, key, placeholder, type }) => (
                  <div key={key}>
                    <label className="mb-1.5 block text-xs font-medium text-slate-400">{label}</label>
                    {key === "description" ? (
                      <textarea value={(form as any)[key]} onChange={e => setForm(p => ({ ...p, [key]:e.target.value }))} rows={3} placeholder={placeholder}
                        className="w-full rounded-xl border border-slate-800 bg-slate-900/50 px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 outline-none focus:border-emerald-500/40 resize-none"
                      />
                    ) : (
                      <input type={type ?? "text"} value={(form as any)[key]} onChange={e => setForm(p => ({ ...p, [key]:e.target.value }))} placeholder={placeholder}
                        className="w-full rounded-xl border border-slate-800 bg-slate-900/50 px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 outline-none focus:border-emerald-500/40"
                      />
                    )}
                  </div>
                ))}
                <div>
                  <label className="mb-2 block text-xs font-medium text-slate-400">Size</label>
                  <div className="grid grid-cols-4 gap-2">
                    {SIZES.map(sz => (
                      <button key={sz} onClick={() => setForm(p => ({ ...p, size:sz }))}
                        className={cn("rounded-xl border py-2 text-xs font-medium transition-all", form.size === sz ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300" : "border-slate-800 text-slate-400 hover:border-slate-700")}
                      >{sz}</button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="border-t border-slate-800/60 p-5 flex gap-3">
                <button onClick={() => setOpen(false)} className="flex-1 rounded-xl border border-slate-800 py-2.5 text-sm text-slate-400 hover:border-slate-700 transition-all">Cancel</button>
                <motion.button whileTap={{ scale:0.97 }} onClick={handleSave} className="flex-1 rounded-xl py-2.5 text-sm font-semibold text-black" style={{ background:"linear-gradient(135deg,#10b981,#059669)" }}>
                  List Space
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </DashboardShell>
  );
}
