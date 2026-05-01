"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { DashboardShell } from "@/components/shared/DashboardShell";
import { BentoCard } from "@/components/shared/BentoCard";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const STATUSES = ["PENDING","CONFIRMED","SHIPPED","DELIVERED","CANCELLED"];
const STATUS_STYLE: Record<string,string> = { PENDING:"pill-pending", CONFIRMED:"pill-info", SHIPPED:"pill-info", DELIVERED:"pill-success", CANCELLED:"pill-error" };

const MOCK = [
  { id:"ORD-001", product:"Heirloom Cherry Tomatoes", customer:"J. Rahman", qty:3, total:20.97, status:"PENDING",   date:"Apr 25 2025" },
  { id:"ORD-002", product:"Organic Basil Bunch",       customer:"S. Islam",   qty:2, total:7.00,  status:"CONFIRMED", date:"Apr 24 2025" },
  { id:"ORD-003", product:"Rainbow Chard",             customer:"F. Ahmed",   qty:1, total:5.25,  status:"SHIPPED",   date:"Apr 23 2025" },
  { id:"ORD-004", product:"Mint Bundle",               customer:"N. Parvin",  qty:4, total:11.96, status:"DELIVERED", date:"Apr 22 2025" },
  { id:"ORD-005", product:"Heirloom Cherry Tomatoes",  customer:"K. Sheikh",  qty:2, total:13.98, status:"CANCELLED", date:"Apr 21 2025" },
];

export default function VendorOrdersPage() {
  const [orders, setOrders] = useState(MOCK);
  const [filter, setFilter] = useState("");

  const update = (id: string, status: string) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    toast.success(`Order ${id} marked as ${status}.`);
  };

  const filtered = filter ? orders.filter(o => o.status === filter) : orders;

  return (
    <DashboardShell role="VENDOR" title="Incoming Orders" subtitle="Manage and fulfil customer orders">
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {["", ...STATUSES].map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={cn("rounded-xl border px-3 py-1.5 text-xs font-medium transition-all", filter === s ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300" : "border-slate-800 text-slate-500 hover:border-slate-700 hover:text-slate-300")}
            >{s || "All"}</button>
          ))}
        </div>

        <BentoCard hoverable={false}>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-800/60">
                  {["Order","Product","Customer","Qty","Total","Date","Status","Action"].map(h => (
                    <th key={h} className="pb-3 text-left font-medium uppercase tracking-wider text-slate-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40">
                {filtered.map((o, i) => (
                  <motion.tr key={o.id} initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:i*0.04 }}
                    className="hover:bg-slate-900/30 transition-colors"
                  >
                    <td className="py-3 font-mono text-slate-400">{o.id}</td>
                    <td className="py-3 font-medium text-slate-200">{o.product}</td>
                    <td className="py-3 text-slate-400">{o.customer}</td>
                    <td className="py-3 text-slate-400">{o.qty}</td>
                    <td className="py-3 font-semibold text-slate-200">${o.total.toFixed(2)}</td>
                    <td className="py-3 text-slate-500">{o.date}</td>
                    <td className="py-3"><span className={cn("pill text-2xs", STATUS_STYLE[o.status])}>{o.status}</span></td>
                    <td className="py-3">
                      {o.status !== "DELIVERED" && o.status !== "CANCELLED" && (
                        <select
                          value={o.status}
                          onChange={e => update(o.id, e.target.value)}
                          className="rounded-lg border border-slate-800 bg-slate-900 px-2 py-1 text-xs text-slate-300 outline-none focus:border-emerald-500/40"
                        >
                          {STATUSES.filter(s => s !== "PENDING" && s !== "CANCELLED").map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
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
