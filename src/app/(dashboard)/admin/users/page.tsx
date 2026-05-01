"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DashboardShell } from "@/components/shared/DashboardShell";
import { BentoCard } from "@/components/shared/BentoCard";
import { Search, Trash2, ShieldOff, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const MOCK_USERS = [
  { id:"u1", name:"Farhan Rahman",  email:"farhan@farm.com",    role:"VENDOR",   status:"ACTIVE",    joined:"Jan 2025" },
  { id:"u2", name:"Nisha Begum",    email:"nisha@garden.com",   role:"VENDOR",   status:"ACTIVE",    joined:"Feb 2025" },
  { id:"u3", name:"Demo Customer",  email:"customer@demo.com",  role:"CUSTOMER", status:"ACTIVE",    joined:"Mar 2025" },
  { id:"u4", name:"Spam Account",   email:"spam@bad.com",       role:"CUSTOMER", status:"SUSPENDED", joined:"Apr 2025" },
  { id:"u5", name:"Arif Hossain",   email:"arif@organic.com",   role:"VENDOR",   status:"ACTIVE",    joined:"Apr 2025" },
];

const ROLE_STYLE: Record<string,string> = { ADMIN:"pill-pending", VENDOR:"pill-success", CUSTOMER:"pill-info" };
const STATUS_STYLE: Record<string,string> = { ACTIVE:"pill-success", SUSPENDED:"pill-error", INACTIVE:"pill-neutral" };

export default function AdminUsersPage() {
  const [users, setUsers] = useState(MOCK_USERS);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [deleting, setDeleting] = useState<string|null>(null);

  const toggle = (id: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE" } : u));
    toast.success("User status updated.");
  };
  const remove = (id: string) => { setUsers(prev => prev.filter(u => u.id !== id)); setDeleting(null); toast.success("User deleted."); };

  const filtered = users.filter(u =>
    (u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())) &&
    (!roleFilter || u.role === roleFilter)
  );

  return (
    <DashboardShell role="ADMIN" title="User Management" subtitle="View and moderate all platform users">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or email..."
              className="w-full rounded-xl border border-slate-800 bg-slate-900/60 py-2 pl-9 pr-4 text-sm text-slate-200 placeholder:text-slate-600 outline-none focus:border-emerald-500/40"
            />
          </div>
          {["","ADMIN","VENDOR","CUSTOMER"].map(r => (
            <button key={r} onClick={() => setRoleFilter(r)}
              className={cn("rounded-xl border px-3 py-1.5 text-xs font-medium transition-all", roleFilter===r ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300" : "border-slate-800 text-slate-500 hover:border-slate-700 hover:text-slate-300")}
            >{r||"All Roles"}</button>
          ))}
        </div>

        <BentoCard hoverable={false}>
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-800/60">
                {["User","Role","Status","Joined","Actions"].map(h => (
                  <th key={h} className="pb-3 text-left font-medium uppercase tracking-wider text-slate-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              {filtered.map((u, i) => (
                <motion.tr key={u.id} initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:i*0.04 }}
                  className="group transition-colors hover:bg-slate-900/30"
                >
                  <td className="py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold text-white" style={{ background:"linear-gradient(135deg,#10b981,#059669)" }}>{u.name[0]}</div>
                      <div>
                        <div className="font-medium text-slate-200">{u.name}</div>
                        <div className="text-slate-500">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3"><span className={cn("pill text-2xs", ROLE_STYLE[u.role])}>{u.role}</span></td>
                  <td className="py-3"><span className={cn("pill text-2xs", STATUS_STYLE[u.status])}>{u.status}</span></td>
                  <td className="py-3 text-slate-500">{u.joined}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-1.5 opacity-0 transition-opacity group-hover:opacity-100">
                      <button onClick={() => toggle(u.id)} className={cn("flex h-6 w-6 items-center justify-center rounded-lg transition-all", u.status==="ACTIVE" ? "bg-amber-500/10 text-amber-400 hover:bg-amber-500/20" : "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20")}>
                        {u.status==="ACTIVE" ? <ShieldOff size={11} /> : <ShieldCheck size={11} />}
                      </button>
                      <button onClick={() => setDeleting(u.id)} className="flex h-6 w-6 items-center justify-center rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"><Trash2 size={11} /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </BentoCard>
      </div>

      <AnimatePresence>
        {deleting && (
          <>
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" />
            <motion.div initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:0.95 }}
              className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-[24px] p-6"
              style={{ background:"#0f172a", border:"1px solid rgba(239,68,68,0.2)" }}
            >
              <h3 className="mb-2 font-semibold text-slate-100" style={{ fontFamily:"var(--font-jakarta)" }}>Delete user?</h3>
              <p className="mb-6 text-sm text-slate-400">This action is permanent and cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleting(null)} className="flex-1 rounded-xl border border-slate-800 py-2.5 text-sm text-slate-400 hover:border-slate-700 transition-all">Cancel</button>
                <button onClick={() => remove(deleting)} className="flex-1 rounded-xl bg-red-500/20 py-2.5 text-sm font-semibold text-red-400 hover:bg-red-500/30 transition-all">Delete</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </DashboardShell>
  );
}
