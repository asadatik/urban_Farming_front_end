"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { DashboardShell } from "@/components/shared/DashboardShell";
import { BentoCard } from "@/components/shared/BentoCard";
import { ShieldCheck, ShieldAlert, ShieldX, Plus } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const AGENCIES = ["USDA Organic","EU Organic","Rainforest Alliance","Non-GMO Project","Fair Trade Certified"];

const MOCK_CERTS = [
  { id:"c1", agency:"USDA Organic",      submitted:"Jan 12 2025", expiry:"Jan 12 2026", status:"APPROVED",  notes:"" },
  { id:"c2", agency:"Rainforest Alliance",submitted:"Mar 5 2025",  expiry:"Mar 5 2026",  status:"PENDING",   notes:"" },
  { id:"c3", agency:"EU Organic",        submitted:"Dec 1 2024",   expiry:"Dec 1 2025",  status:"REJECTED",  notes:"Document scan quality was insufficient. Please resubmit." },
];

const STATUS_CONFIG: Record<string,{ icon: React.ReactNode; style:string; glow:string }> = {
  APPROVED: { icon:<ShieldCheck size={18} className="text-emerald-400" />, style:"pill-success", glow:"rgba(16,185,129,0.15)" },
  PENDING:  { icon:<ShieldAlert  size={18} className="text-amber-400"   />, style:"pill-warning", glow:"rgba(245,158,11,0.12)" },
  REJECTED: { icon:<ShieldX     size={18} className="text-red-400"      />, style:"pill-error",   glow:"rgba(239,68,68,0.12)" },
};

export default function VendorCertsPage() {
  const [certs, setCerts] = useState(MOCK_CERTS);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ agency:"USDA Organic", certificationDate:"", expiryDate:"", documentUrl:"" });

  const submit = () => {
    if (!form.certificationDate) { toast.error("Certification date is required."); return; }
    setCerts(prev => [{ id:`c${Date.now()}`, agency:form.agency, submitted:new Date().toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}), expiry:form.expiryDate || "—", status:"PENDING", notes:"" }, ...prev]);
    setShowForm(false);
    setForm({ agency:"USDA Organic", certificationDate:"", expiryDate:"", documentUrl:"" });
    toast.success("Certification submitted for review.");
  };

  return (
    <DashboardShell role="VENDOR" title="Certifications" subtitle="Submit and track your organic certifications">
      <div className="space-y-4">
        <div className="flex justify-end">
          <motion.button whileTap={{ scale:0.97 }} onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-black"
            style={{ background:"linear-gradient(135deg,#10b981,#059669)" }}
          >
            <Plus size={14} />Submit New Cert
          </motion.button>
        </div>

        {showForm && (
          <BentoCard hoverable={false} glow>
            <h3 className="mb-4 font-semibold text-slate-100" style={{ fontFamily:"var(--font-jakarta)" }}>New Certification</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-400">Certifying Agency</label>
                <select value={form.agency} onChange={e => setForm(p => ({ ...p, agency:e.target.value }))}
                  className="w-full rounded-xl border border-slate-800 bg-slate-900/50 px-3 py-2.5 text-sm text-slate-200 outline-none focus:border-emerald-500/40"
                >
                  {AGENCIES.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-400">Document URL (optional)</label>
                <input value={form.documentUrl} onChange={e => setForm(p => ({ ...p, documentUrl:e.target.value }))} placeholder="https://drive.google.com/..."
                  className="w-full rounded-xl border border-slate-800 bg-slate-900/50 px-3 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 outline-none focus:border-emerald-500/40"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-400">Certification Date</label>
                <input type="date" value={form.certificationDate} onChange={e => setForm(p => ({ ...p, certificationDate:e.target.value }))}
                  className="w-full rounded-xl border border-slate-800 bg-slate-900/50 px-3 py-2.5 text-sm text-slate-200 outline-none focus:border-emerald-500/40"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-400">Expiry Date (optional)</label>
                <input type="date" value={form.expiryDate} onChange={e => setForm(p => ({ ...p, expiryDate:e.target.value }))}
                  className="w-full rounded-xl border border-slate-800 bg-slate-900/50 px-3 py-2.5 text-sm text-slate-200 outline-none focus:border-emerald-500/40"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end gap-3">
              <button onClick={() => setShowForm(false)} className="rounded-xl border border-slate-800 px-4 py-2 text-sm text-slate-400 hover:border-slate-700 transition-all">Cancel</button>
              <motion.button whileTap={{ scale:0.97 }} onClick={submit} className="rounded-xl px-4 py-2 text-sm font-semibold text-black" style={{ background:"linear-gradient(135deg,#10b981,#059669)" }}>Submit</motion.button>
            </div>
          </BentoCard>
        )}

        <div className="space-y-3">
          {certs.map((c, i) => {
            const cfg = STATUS_CONFIG[c.status];
            return (
              <motion.div key={c.id} initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.07 }}
                className="flex items-start gap-4 rounded-[20px] border border-slate-800/80 p-5 transition-all duration-200"
                style={{ background:"linear-gradient(145deg,#0f172a,#0c1525)", boxShadow:`0 0 20px ${cfg.glow}` }}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ background:cfg.glow, border:`1px solid ${cfg.glow}` }}>
                  {cfg.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-slate-100" style={{ fontFamily:"var(--font-jakarta)", fontSize:14 }}>{c.agency}</h3>
                    <span className={cn("pill text-2xs", cfg.style)}>{c.status}</span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">Submitted: {c.submitted} · Expires: {c.expiry}</p>
                  {c.notes && <p className="mt-2 rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-2 text-xs text-red-400">{c.notes}</p>}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </DashboardShell>
  );
}
