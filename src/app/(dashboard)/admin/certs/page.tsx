"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DashboardShell } from "@/components/shared/DashboardShell";
import { BentoCard } from "@/components/shared/BentoCard";
import { ChevronDown, ChevronUp, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const MOCK = [
  { id:"c1", vendor:"Green Acres Farm",  agency:"USDA Organic",      submitted:"Apr 23 2025", expiry:"Apr 23 2026", status:"PENDING", doc:"https://drive.google.com" },
  { id:"c2", vendor:"Urban Roots Co.",   agency:"EU Organic",         submitted:"Apr 24 2025", expiry:"Apr 24 2026", status:"PENDING", doc:"" },
  { id:"c3", vendor:"Rooftop Harvest",   agency:"Rainforest Alliance",submitted:"Apr 25 2025", expiry:"Apr 25 2026", status:"APPROVED",doc:"" },
  { id:"c4", vendor:"Metro Garden Hub",  agency:"Non-GMO Project",    submitted:"Apr 20 2025", expiry:"Apr 20 2026", status:"REJECTED",doc:"" },
];

const STATUS_STYLE: Record<string,string> = { PENDING:"pill-pending", APPROVED:"pill-success", REJECTED:"pill-error" };

export default function AdminCertsPage() {
  const [certs, setCerts] = useState(MOCK);
  const [expanded, setExpanded] = useState<string|null>(null);
  const [notes, setNotes] = useState<Record<string,string>>({});

  const review = (id: string, status: "APPROVED"|"REJECTED") => {
    if (status === "REJECTED" && !notes[id]?.trim()) { toast.error("Admin notes are required for rejection."); return; }
    setCerts(prev => prev.map(c => c.id === id ? { ...c, status } : c));
    setExpanded(null);
    toast.success(`Certification ${status.toLowerCase()}.`);
  };

  return (
    <DashboardShell role="ADMIN" title="Certification Review" subtitle="Approve or reject vendor sustainability certifications">
      <div className="space-y-3">
        {certs.map((c, i) => (
          <motion.div key={c.id} initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.06 }}
            className="overflow-hidden rounded-[20px] border border-slate-800/80" style={{ background:"linear-gradient(145deg,#0f172a,#0c1525)" }}
          >
            <button className="flex w-full items-center gap-4 px-5 py-4 text-left" onClick={() => setExpanded(expanded===c.id ? null : c.id)}>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-slate-100 text-sm" style={{ fontFamily:"var(--font-jakarta)" }}>{c.vendor}</span>
                  <span className={cn("pill text-2xs", STATUS_STYLE[c.status])}>{c.status}</span>
                </div>
                <div className="flex items-center gap-4 mt-0.5 text-xs text-slate-500">
                  <span>{c.agency}</span>
                  <span>Submitted: {c.submitted}</span>
                  <span>Expires: {c.expiry}</span>
                </div>
              </div>
              {expanded === c.id ? <ChevronUp size={14} className="text-slate-500 shrink-0" /> : <ChevronDown size={14} className="text-slate-500 shrink-0" />}
            </button>

            <AnimatePresence>
              {expanded === c.id && (
                <motion.div initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }} exit={{ height:0, opacity:0 }} transition={{ duration:0.25 }}
                  className="overflow-hidden border-t border-slate-800/60 px-5 py-4"
                >
                  <div className="space-y-4">
                    {c.doc && (
                      <div>
                        <p className="mb-1.5 text-xs font-medium text-slate-400">Document</p>
                        <a href={c.doc} target="_blank" rel="noreferrer" className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors">View certification document ↗</a>
                      </div>
                    )}
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-slate-400">Admin Notes {c.status === "PENDING" && <span className="text-red-400">(required for rejection)</span>}</label>
                      <textarea value={notes[c.id]??""} onChange={e => setNotes(p => ({ ...p, [c.id]:e.target.value }))} rows={2}
                        placeholder="Add review notes..."
                        className="w-full rounded-xl border border-slate-800 bg-slate-900/50 px-3 py-2.5 text-xs text-slate-200 placeholder:text-slate-600 outline-none focus:border-emerald-500/40 resize-none"
                        disabled={c.status !== "PENDING"}
                      />
                    </div>
                    {c.status === "PENDING" && (
                      <div className="flex gap-3">
                        <motion.button whileTap={{ scale:0.97 }} onClick={() => review(c.id,"APPROVED")}
                          className="flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-400 hover:bg-emerald-500/20 transition-all"
                        ><CheckCircle2 size={12} />Approve</motion.button>
                        <motion.button whileTap={{ scale:0.97 }} onClick={() => review(c.id,"REJECTED")}
                          className="flex items-center gap-1.5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs font-semibold text-red-400 hover:bg-red-500/20 transition-all"
                        ><XCircle size={12} />Reject</motion.button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </DashboardShell>
  );
}
