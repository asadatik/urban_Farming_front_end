"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DashboardShell } from "@/components/shared/DashboardShell";
import { BentoCard } from "@/components/shared/BentoCard";
import { CheckCircle2, XCircle, MapPin } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const PENDING = [
  { id:"v1", farm:"Green Valley Farm",  owner:"Sultana Parvin",  location:"Dhaka North",  submitted:"Apr 23 2025", produces:8 },
  { id:"v2", farm:"Rooftop Organics",   owner:"Karim Sheikh",    location:"Gulshan",      submitted:"Apr 24 2025", produces:5 },
  { id:"v3", farm:"Urban Sprouts Co.",  owner:"Mitu Akter",      location:"Dhanmondi",    submitted:"Apr 25 2025", produces:12 },
];

const APPROVED = [
  { id:"v4", farm:"Green Acres Farm",   owner:"Farhan Rahman",   location:"Brooklyn, NY", status:"APPROVED" },
  { id:"v5", farm:"Urban Roots Co.",    owner:"Nisha Begum",     location:"Austin, TX",   status:"APPROVED" },
];

export default function AdminVendorsPage() {
  const [tab, setTab] = useState<"pending"|"all">("pending");
  const [pending, setPending] = useState(PENDING);
  const [approved, setApproved] = useState(APPROVED);

  const decide = (id: string, status: "APPROVED"|"REJECTED") => {
    const vendor = pending.find(v => v.id === id);
    if (!vendor) return;
    setPending(prev => prev.filter(v => v.id !== id));
    if (status === "APPROVED") {
      setApproved(prev => [{ id, farm:vendor.farm, owner:vendor.owner, location:vendor.location, status:"APPROVED" }, ...prev]);
      toast.success(`${vendor.farm} approved.`);
    } else {
      toast.error(`${vendor.farm} rejected.`);
    }
  };

  return (
    <DashboardShell role="ADMIN" title="Vendor Management" subtitle="Approve and monitor all platform vendors">
      <div className="space-y-4">
        <div className="flex gap-2">
          {([["pending","Pending Approval"],["all","All Vendors"]] as const).map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)}
              className={cn("rounded-xl border px-4 py-2 text-sm font-medium transition-all", tab===key ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300" : "border-slate-800 text-slate-500 hover:border-slate-700 hover:text-slate-300")}
            >
              {label} {key==="pending" && pending.length > 0 && <span className="ml-1.5 rounded-full bg-amber-500/20 px-1.5 py-0.5 text-2xs text-amber-400">{pending.length}</span>}
            </button>
          ))}
        </div>

        {tab === "pending" ? (
          <div className="space-y-3">
            {pending.length === 0 && (
              <div className="flex flex-col items-center justify-center gap-3 rounded-[24px] border border-slate-800/60 py-16 text-center" style={{ background:"linear-gradient(145deg,#0f172a,#0c1525)" }}>
                <CheckCircle2 size={32} className="text-emerald-500/40" />
                <p className="text-sm text-slate-400">All vendor applications reviewed.</p>
              </div>
            )}
            <AnimatePresence>
              {pending.map((v, i) => (
                <motion.div key={v.id} initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, x:40, height:0, marginBottom:0 }}
                  transition={{ duration: 0.3 }}
                  className="group flex items-center gap-4 rounded-[20px] border border-slate-800/80 px-5 py-4"
                  style={{ background:"linear-gradient(145deg,#0f172a,#0c1525)" }}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white" style={{ background:"linear-gradient(135deg,#10b981,#059669)" }}>{v.farm[0]}</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-100 text-sm" style={{ fontFamily:"var(--font-jakarta)" }}>{v.farm}</p>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-xs text-slate-500">{v.owner}</span>
                      <span className="flex items-center gap-1 text-xs text-slate-600"><MapPin size={9}/>{v.location}</span>
                      <span className="text-xs text-slate-600">{v.produces} listings</span>
                    </div>
                  </div>
                  <span className="text-xs text-slate-600 shrink-0">{v.submitted}</span>
                  <div className="flex items-center gap-2 shrink-0">
                    <motion.button whileTap={{ scale:0.95 }} onClick={() => decide(v.id,"APPROVED")}
                      className="flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-400 transition-all hover:bg-emerald-500/20"
                    ><CheckCircle2 size={12} />Approve</motion.button>
                    <motion.button whileTap={{ scale:0.95 }} onClick={() => decide(v.id,"REJECTED")}
                      className="flex items-center gap-1.5 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-400 transition-all hover:bg-red-500/20"
                    ><XCircle size={12} />Reject</motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <BentoCard hoverable={false}>
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-800/60">
                  {["Farm","Owner","Location","Status"].map(h => (
                    <th key={h} className="pb-3 text-left font-medium uppercase tracking-wider text-slate-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40">
                {approved.map((v, i) => (
                  <motion.tr key={v.id} initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:i*0.05 }}
                    className="hover:bg-slate-900/30 transition-colors"
                  >
                    <td className="py-3 font-medium text-slate-200">{v.farm}</td>
                    <td className="py-3 text-slate-400">{v.owner}</td>
                    <td className="py-3 text-slate-500">{v.location}</td>
                    <td className="py-3"><span className="pill-success pill text-2xs">{v.status}</span></td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </BentoCard>
        )}
      </div>
    </DashboardShell>
  );
}
