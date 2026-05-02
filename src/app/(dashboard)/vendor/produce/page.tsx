"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DashboardShell } from "@/components/shared/DashboardShell";
import { BentoCard } from "@/components/shared/BentoCard";
import { Plus, X, Pencil, Trash2, ShieldCheck, AlertCircle, Search } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { Produce, ProduceCategory } from "@/types";

const MOCK: Produce[] = [
  { id:"p1", vendorId:"v1", name:"Heirloom Cherry Tomatoes", price:6.99, category:"VEGETABLES", certificationStatus:"APPROVED", availableQuantity:120, isActive:true, description:"Vine-ripened cherry tomatoes." },
  { id:"p2", vendorId:"v1", name:"Organic Basil Bunch",      price:3.50, category:"HERBS",      certificationStatus:"APPROVED", availableQuantity:12,  isActive:true, description:"Fresh Genovese basil." },
  { id:"p3", vendorId:"v1", name:"Rainbow Chard",            price:5.25, category:"VEGETABLES", certificationStatus:"PENDING",  availableQuantity:65,  isActive:true, description:"Vibrant rainbow chard." },
  { id:"p4", vendorId:"v1", name:"Mint Bundle",              price:2.99, category:"HERBS",      certificationStatus:"PENDING",  availableQuantity:34,  isActive:false, description:"Fresh spearmint." },
];

const CERT_STYLES: Record<string,string> = { APPROVED:"pill-success", PENDING:"pill-pending", REJECTED:"pill-error" };
const CATEGORIES: ProduceCategory[] = ["VEGETABLES","FRUITS","HERBS","SEEDS","TOOLS","OTHER"];

interface FormState { name:string; price:string; category:ProduceCategory; availableQuantity:string; description:string; imageUrl:string; }
const EMPTY: FormState = { name:"", price:"", category:"VEGETABLES", availableQuantity:"", description:"", imageUrl:"" };

export default function VendorProducePage() {
  const [items, setItems] = useState(MOCK);
  const [search, setSearch] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editing, setEditing] = useState<Produce | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [deleting, setDeleting] = useState<string | null>(null);

  const filtered = items.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  const openAdd = () => { setEditing(null); setForm(EMPTY); setDrawerOpen(true); };
  const openEdit = (p: Produce) => {
    setEditing(p);
    setForm({ name:p.name, price:String(p.price), category:p.category, availableQuantity:String(p.availableQuantity), description:p.description??""  , imageUrl:p.imageUrl??"" });
    setDrawerOpen(true);
  };

  const handleSave = () => {
    if (!form.name || !form.price) { toast.error("Name and price are required."); return; }
    if (editing) {
      setItems(prev => prev.map<Produce>(p => (
        p.id === editing.id
          ? {
              ...p,
              name: form.name,
              description: form.description,
              imageUrl: form.imageUrl,
              category: form.category,
              price: Number.parseFloat(form.price),
              availableQuantity: Number.parseInt(form.availableQuantity, 10) || 0,
            }
          : p
      )));
      toast.success("Listing updated.");
    } else {
      const newItem: Produce = { id: `p${Date.now()}`, vendorId:"v1", ...form, price: Number.parseFloat(form.price), availableQuantity: Number.parseInt(form.availableQuantity, 10)||0, certificationStatus:"PENDING", isActive:true };
      setItems(prev => [newItem, ...prev]);
      toast.success("Listing created. Awaiting certification.");
    }
    setDrawerOpen(false);
  };

  const handleDelete = (id: string) => {
    setItems(prev => prev.filter(p => p.id !== id));
    setDeleting(null);
    toast.success("Listing removed.");
  };

  return (
    <DashboardShell role="VENDOR" title="My Produce" subtitle="Manage your marketplace listings">
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="relative max-w-sm flex-1">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search listings..."
              className="w-full rounded-xl border border-slate-800 bg-slate-900/60 py-2 pl-9 pr-4 text-sm text-slate-200 placeholder:text-slate-600 outline-none focus:border-emerald-500/40"
            />
          </div>
          <motion.button whileTap={{ scale:0.97 }} onClick={openAdd}
            className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-black"
            style={{ background:"linear-gradient(135deg,#10b981,#059669)", boxShadow:"0 0 16px rgba(16,185,129,0.25)" }}
          >
            <Plus size={14} />New Listing
          </motion.button>
        </div>

        <BentoCard hoverable={false}>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-800/60">
                  {["Product","Category","Price","Stock","Status","Active",""].map(h => (
                    <th key={h} className="pb-3 text-left font-medium uppercase tracking-wider text-slate-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40">
                {filtered.map((p,i) => (
                  <motion.tr key={p.id} initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:i*0.04 }}
                    className="group transition-colors hover:bg-slate-900/30"
                  >
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        {p.availableQuantity < 20 && <AlertCircle size={11} className="text-amber-400 shrink-0" />}
                        <span className="font-medium text-slate-200">{p.name}</span>
                      </div>
                    </td>
                    <td className="py-3 text-slate-400">{p.category}</td>
                    <td className="py-3 font-semibold text-slate-200">${p.price.toFixed(2)}</td>
                    <td className={cn("py-3 font-medium", p.availableQuantity < 20 ? "text-amber-400" : "text-slate-400")}>{p.availableQuantity}</td>
                    <td className="py-3"><span className={cn("pill text-2xs", CERT_STYLES[p.certificationStatus])}>{p.certificationStatus}</span></td>
                    <td className="py-3">
                      <span className={cn("pill text-2xs", p.isActive ? "pill-success" : "pill-neutral")}>{p.isActive ? "Active" : "Paused"}</span>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                        <button onClick={() => openEdit(p)} className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-800 text-slate-400 hover:text-slate-200"><Pencil size={11} /></button>
                        <button onClick={() => setDeleting(p.id)} className="flex h-6 w-6 items-center justify-center rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"><Trash2 size={11} /></button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </BentoCard>
      </div>

      {/* Slide-over drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} onClick={() => setDrawerOpen(false)} className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ x:"100%" }} animate={{ x:0 }} exit={{ x:"100%" }} transition={{ type:"spring", stiffness:300, damping:30 }}
              className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col"
              style={{ background:"linear-gradient(180deg,#0d1829,#020617)", borderLeft:"1px solid rgba(30,41,59,0.8)" }}
            >
              <div className="flex items-center justify-between border-b border-slate-800/60 px-6 py-4">
                <h2 className="font-semibold text-slate-100" style={{ fontFamily:"var(--font-jakarta)" }}>{editing ? "Edit Listing" : "New Listing"}</h2>
                <button onClick={() => setDrawerOpen(false)} className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-800 text-slate-500 hover:text-slate-300"><X size={13} /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {[
                  { label:"Product Name", key:"name", type:"text", placeholder:"e.g. Organic Tomatoes" },
                  { label:"Price ($)", key:"price", type:"number", placeholder:"0.00" },
                  { label:"Available Quantity", key:"availableQuantity", type:"number", placeholder:"0" },
                  { label:"Image URL (optional)", key:"imageUrl", type:"text", placeholder:"https://..." },
                ].map(({ label, key, type, placeholder }) => (
                  <div key={key}>
                    <label className="mb-1.5 block text-xs font-medium text-slate-400">{label}</label>
                    <input type={type} value={(form as any)[key]} onChange={e => setForm(prev => ({ ...prev, [key]: e.target.value }))} placeholder={placeholder}
                      className="w-full rounded-xl border border-slate-800 bg-slate-900/50 px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 outline-none focus:border-emerald-500/40 focus:ring-2 focus:ring-emerald-500/15"
                    />
                  </div>
                ))}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-400">Category</label>
                  <select value={form.category} onChange={e => setForm(prev => ({ ...prev, category: e.target.value as ProduceCategory }))}
                    className="w-full rounded-xl border border-slate-800 bg-slate-900/50 px-4 py-2.5 text-sm text-slate-200 outline-none focus:border-emerald-500/40"
                  >
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-400">Description</label>
                  <textarea value={form.description} onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))} rows={3} placeholder="Describe your produce..."
                    className="w-full rounded-xl border border-slate-800 bg-slate-900/50 px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 outline-none focus:border-emerald-500/40 resize-none"
                  />
                </div>
              </div>
              <div className="border-t border-slate-800/60 p-5 flex gap-3">
                <button onClick={() => setDrawerOpen(false)} className="flex-1 rounded-xl border border-slate-800 py-2.5 text-sm text-slate-400 hover:border-slate-700 hover:text-slate-200 transition-all">Cancel</button>
                <motion.button whileTap={{ scale:0.97 }} onClick={handleSave} className="flex-1 rounded-xl py-2.5 text-sm font-semibold text-black transition-all" style={{ background:"linear-gradient(135deg,#10b981,#059669)" }}>
                  {editing ? "Save Changes" : "Create Listing"}
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Delete confirmation */}
      <AnimatePresence>
        {deleting && (
          <>
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" />
            <motion.div initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:0.95 }}
              className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-[24px] p-6"
              style={{ background:"#0f172a", border:"1px solid rgba(239,68,68,0.2)" }}
            >
              <h3 className="mb-2 font-semibold text-slate-100" style={{ fontFamily:"var(--font-jakarta)" }}>Delete listing?</h3>
              <p className="mb-6 text-sm text-slate-400">This will permanently remove this produce listing from the marketplace.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleting(null)} className="flex-1 rounded-xl border border-slate-800 py-2.5 text-sm text-slate-400 hover:border-slate-700 transition-all">Cancel</button>
                <button onClick={() => handleDelete(deleting)} className="flex-1 rounded-xl bg-red-500/20 py-2.5 text-sm font-semibold text-red-400 hover:bg-red-500/30 transition-all">Delete</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </DashboardShell>
  );
}
