"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { DashboardShell } from "@/components/shared/DashboardShell";
import { BentoCard } from "@/components/shared/BentoCard";
import { CheckCircle2, XCircle, Search } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const MOCK = [
  { id:"p1", name:"Heirloom Cherry Tomatoes", vendor:"Green Acres Farm",   category:"VEGETABLES", price:6.99,  status:"PENDING",  date:"Apr 25" },
  { id:"p2", name:"Organic Basil Bunch",       vendor:"Urban Roots Co.",    category:"HERBS",      price:3.50,  status:"PENDING",  date:"Apr 24" },
  { id:"p3", name:"Rainbow Chard",             vendor:"Metro Garden Hub",   category:"VEGETABLES", price:5.25,  status:"APPROVED", date:"Apr 23" },
  { id:"p4", name:"Lavender Honey",            vendor:"Skyline Sprouts",    category:"OTHER",      price:14.00, status:"APPROVED", date:"Apr 22" },
  { id:"p5", name:"Cherry Peppers",            vendor:"Rooftop Harvest",    category:"VEGETABLES", price:5.50,  status:"REJECTED", date:"Apr 21" },
  { id:"p6", name:"Compost Starter Kit",       vendor:"Rooftop Harvest",    category:"OTHER",      price:18.00, status:"PENDING",  date:"Apr 20" },
];

const STATUS_STYLE: Record<string,string> = { PENDING:"pill-pending", APPROVED:"pill-success", REJECTED:"pill-error" };

export default function AdminProducePage() {
  const [items, setItems] = useState(MOCK);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selected, setSelected] = useState<string[]>([]);

  const decide = (id: string, status: "APPROVED" | "REJECTED") => {
    setItems(prev => prev.map(p => p.id === id ? { ...p, status } : p));
    toast.success(`Produce ${status.toLowerCase()}.`);
  };

  const bulkApprove = () => {
    setItems(prev => prev.map(p => selected.includes(p.id) ? { ...p, status:"APPROVED" } : p));
    toast.success(`${selected.length} items approved.`);
    setSelected([]);
  };

  const toggleSelect = (id: string) =>
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const categories = [...new Set(MOCK.map(p => p.category))];

  const filtered = items.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) &&
    (!catFilter || p.category === catFilter) &&
    (!statusFilter || p.status === statusFilter)
  );

  return (
    <DashboardShell role="ADMIN" title="Produce Moderation" subtitle="Approve or reject marketplace listings">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 max-w-xs">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search produce..."
              className="w-full rounded-xl border border-slate-800 bg-slate-900/60 py-2 pl-9 pr-4 text-sm text-slate-200 placeholder:text-slate-600 outline-none focus:border-emerald-500/40"
            />
          </div>
          {["", ...categories].map(c => (
            <button key={c} onClick={() => setCatFilter(c)}
              className={cn("rounded-xl border px-3 py-1.5 text-xs font-medium transition-all", catFilter===c ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300" : "border-slate-800 text-slate-500 hover:border-slate-700 hover:text-slate-300")}
            >{c || "All"}</button>
          ))}
          {["","PENDING","APPROVED","REJECTED"].map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={cn("rounded-xl border px-3 py-1.5 text-xs font-medium transition-all", statusFilter===s ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300" : "border-slate-800 text-slate-500 hover:border-slate-700 hover:text-slate-300")}
            >{s || "All Status"}</button>
          ))}
          {selected.length > 0 && (
            <motion.button whileTap={{ scale:0.97 }} onClick={bulkApprove}
              className="ml-auto flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-400 hover:bg-emerald-500/20 transition-all"
            >
              <CheckCircle2 size={12} />Approve {selected.length} selected
            </motion.button>
          )}
        </div>

        <BentoCard hoverable={false}>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-800/60">
                  <th className="pb-3 pr-4 text-left w-8">
                    <input type="checkbox" className="rounded" onChange={e => setSelected(e.target.checked ? filtered.map(p=>p.id) : [])} />
                  </th>
                  {["Product","Vendor","Category","Price","Status","Date","Actions"].map(h => (
                    <th key={h} className="pb-3 text-left font-medium uppercase tracking-wider text-slate-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40">
                {filtered.map((p, i) => (
                  <motion.tr key={p.id} initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:i*0.04 }}
                    className="group transition-colors hover:bg-slate-900/30"
                  >
                    <td className="py-3 pr-4">
                      <input type="checkbox" className="rounded" checked={selected.includes(p.id)} onChange={() => toggleSelect(p.id)} />
                    </td>
                    <td className="py-3 font-medium text-slate-200">{p.name}</td>
                    <td className="py-3 text-slate-400">{p.vendor}</td>
                    <td className="py-3 text-slate-400">{p.category}</td>
                    <td className="py-3 font-semibold text-slate-200">${p.price.toFixed(2)}</td>
                    <td className="py-3"><span className={cn("pill text-2xs", STATUS_STYLE[p.status])}>{p.status}</span></td>
                    <td className="py-3 text-slate-500">{p.date}</td>
                    <td className="py-3">
                      {p.status === "PENDING" && (
                        <div className="flex items-center gap-1.5 opacity-0 transition-opacity group-hover:opacity-100">
                          <button onClick={() => decide(p.id,"APPROVED")} className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-all"><CheckCircle2 size={11} /></button>
                          <button onClick={() => decide(p.id,"REJECTED")} className="flex h-6 w-6 items-center justify-center rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"><XCircle size={11} /></button>
                        </div>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </BentoCard>
      </div>
    </DashboardShell>
  );
}
