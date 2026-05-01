"use client";
import { motion } from "framer-motion";
import { BentoCard, BentoGrid } from "@/components/shared/BentoCard";
import { StatCard } from "@/components/shared/StatCard";
import { Users, Store, ShieldCheck, Activity, CheckCircle2, XCircle, Clock, ArrowRight, Zap } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useAdminUsers, useAdminCerts, useAdminVendors } from "@/hooks/useApi";
import { vendorApi, certApi } from "@/lib/api/services";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const GROWTH = [
  { day:"Mon",users:8,orders:24 },{ day:"Tue",users:12,orders:31 },{ day:"Wed",users:6,orders:19 },
  { day:"Thu",users:15,orders:42 },{ day:"Fri",users:20,orders:58 },{ day:"Sat",users:18,orders:50 },{ day:"Sun",users:10,orders:33 },
];

const Tip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-white/08 bg-black/90 p-3 text-xs backdrop-blur shadow-xl">
      <p className="mb-1 font-semibold text-zinc-300">{label}</p>
      {payload.map((p:any) => <p key={p.dataKey} style={{ color:p.color }}>{p.dataKey}: {p.value}</p>)}
    </div>
  );
};

const HEALTH = [
  { label:"API Response",  value:"98.7%",     ok:true },
  { label:"DB Health",     value:"Healthy",   ok:true },
  { label:"Error Rate",    value:"0.3%",      ok:true },
];

export function AdminDashboard() {
  const qc = useQueryClient();
  const { data: usersData,   isLoading: uLoad } = useAdminUsers();
  const { data: certsData,   isLoading: cLoad } = useAdminCerts("PENDING");
  const { data: vendorsData, isLoading: vLoad } = useAdminVendors("PENDING");




  const totalUsers   = usersData?.meta?.total   ?? 0;
  const pendingCerts = certsData?.meta?.total    ?? (certsData?.data as any[])?.length ?? 0;
  const pendingVends = vendorsData?.meta?.total  ?? (vendorsData?.data as any[])?.length ?? 0;
  const certs = (certsData?.data as any[]) ?? [];

  const approveVendor = async (id: string) => {
    try { await vendorApi.approve(id,"APPROVED"); toast.success("Vendor approved."); qc.invalidateQueries({ queryKey:["admin-vendors"] }); }
    catch { toast.error("Failed to approve."); }
  };
  const rejectVendor = async (id: string) => {
    try { await vendorApi.approve(id,"REJECTED"); toast.success("Vendor rejected."); qc.invalidateQueries({ queryKey:["admin-vendors"] }); }
    catch { toast.error("Failed to reject."); }
  };
  const reviewCert = async (id: string, status: "APPROVED"|"REJECTED") => {
    try { await certApi.review(id,status); toast.success(`Cert ${status.toLowerCase()}.`); qc.invalidateQueries({ queryKey:["admin-certs"] }); }
    catch { toast.error("Failed to update cert."); }
  };


  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total Users"     value={uLoad?"—":String(totalUsers)}   delta={{ value:12,label:"this week" }} icon={<Users size={15}/>} delay={0} />
        <StatCard label="Pending Vendors" value={vLoad?"—":String(pendingVends)} icon={<Store size={15}/>}       accent="#f59e0b" delay={0.05} />
        <StatCard label="Pending Certs"   value={cLoad?"—":String(pendingCerts)} icon={<ShieldCheck size={15}/>} accent="#f59e0b" delay={0.1} />
        <StatCard label="Platform Uptime" value="99.9%"                          icon={<Activity size={15}/>}    accent="#3b82f6" delay={0.15} />
      </div>

      <BentoGrid cols={3}>
        {/* Cert review queue */}
        <BentoCard span="2" hoverable={false} glow delay={0.1} className="col-span-3 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color:"var(--text-3)" }}>Moderation</p>
              <h3 className="mt-0.5 text-sm font-bold text-white" style={{ fontFamily:"var(--font-jakarta)" }}>Certification Review Queue</h3>
            </div>
            <span className={cn("text-2xs pill", pendingCerts > 0 ? "pill-warning" : "pill-success")} style={{ display:"inline-flex",alignItems:"center",padding:"2px 10px",borderRadius:9999,fontSize:"0.65rem",fontWeight:500 }}>
              {pendingCerts} Pending
            </span>
          </div>

          {cLoad ? (
            <div className="space-y-2">{Array(3).fill(0).map((_,i)=><div key={i} className="h-14 rounded-xl" style={{ background:"rgba(255,255,255,0.03)",animation:"pulse 2s infinite" }} />)}</div>
          ) : certs.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-8 text-center">
              <CheckCircle2 size={28} className="text-zinc-800" />
              <p className="text-sm" style={{ color:"var(--text-3)" }}>All certifications reviewed</p>
            </div>
          ) : certs.slice(0,5).map((cert:any,i:number)=>(
            <motion.div key={cert.id} initial={{ opacity:0,y:6 }} animate={{ opacity:1,y:0 }} transition={{ delay:i*0.07+0.25 }}
              className="group mb-2 flex items-center gap-4 rounded-xl border border-white/04 bg-white/02 px-4 py-3 transition-all hover:border-white/08">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ background:"rgba(245,158,11,0.1)" }}>
                <Clock size={14} className="text-amber-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-zinc-200">{cert.vendor?.farmName ?? "Unknown Farm"}</p>
                <p className="text-xs" style={{ color:"var(--text-3)" }}>{cert.certifyingAgency} · {cert.vendor?.user?.email}</p>
              </div>
              <div className="flex shrink-0 items-center gap-1.5 opacity-0 transition-opacity group-hover:opacity-100">
                <button onClick={() => reviewCert(cert.id,"APPROVED")} className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/12 text-emerald-400 transition-all hover:bg-emerald-500/20"><CheckCircle2 size={12} /></button>
                <button onClick={() => reviewCert(cert.id,"REJECTED")} className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-500/12 text-red-400 transition-all hover:bg-red-500/20"><XCircle size={12} /></button>
              </div>
            </motion.div>
          ))}
        </BentoCard>

        {/* Platform health */}
        <BentoCard hoverable={false} delay={0.15} className="col-span-3 lg:col-span-1">
          <div className="mb-4 flex items-center gap-2">
            <Zap size={13} style={{ color:"#22c55e" }} />
            <p className="text-sm font-bold text-white" style={{ fontFamily:"var(--font-jakarta)" }}>Platform Health</p>
          </div>
          <div className="space-y-2.5">
            {HEALTH.map((m,i)=>(
              <motion.div key={m.label} initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:i*0.07+0.3 }}
                className="flex items-center justify-between rounded-xl border border-white/04 bg-white/02 px-3 py-2.5">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full" style={{ background: m.ok ? "#22c55e" : "#f59e0b", boxShadow: m.ok ? "0 0 6px #22c55e" : "0 0 6px #f59e0b" }} />
                  <span className="text-xs" style={{ color:"var(--text-3)" }}>{m.label}</span>
                </div>
                <span className="text-xs font-semibold" style={{ color: m.ok ? "#22c55e" : "#f59e0b" }}>{m.value}</span>
              </motion.div>
            ))}
          </div>
          <div className="mt-4">
            <div className="mb-1.5 flex justify-between text-xs" style={{ color:"var(--text-3)" }}><span>Platform Load</span><span>34%</span></div>
            <div className="h-1.5 rounded-full" style={{ background:"rgba(255,255,255,0.06)" }}>
              <motion.div initial={{ width:0 }} animate={{ width:"34%" }} transition={{ duration:0.9,delay:0.5 }}
                className="h-1.5 rounded-full" style={{ background:"linear-gradient(90deg,#22c55e,#86efac)" }} />
            </div>
          </div>
        </BentoCard>

        {/* Growth chart */}
        <BentoCard span="full" hoverable={false} delay={0.2}>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color:"var(--text-3)" }}>Analytics</p>
              <h3 className="mt-0.5 text-sm font-bold text-white" style={{ fontFamily:"var(--font-jakarta)" }}>7-Day Platform Growth</h3>
            </div>
            <a href="/dashboard/admin/users" className="flex items-center gap-1 text-xs transition-colors hover:text-white" style={{ color:"#22c55e" }}>
              Full report <ArrowRight size={10} />
            </a>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={GROWTH} margin={{ top:4,right:4,bottom:0,left:-16 }} barGap={3}>
              <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="day" tick={{ fill:"rgba(255,255,255,0.25)",fontSize:11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill:"rgba(255,255,255,0.25)",fontSize:11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<Tip />} cursor={{ fill:"rgba(255,255,255,0.02)" }} />
              <Bar dataKey="users"  fill="#22c55e" radius={[4,4,0,0]} maxBarSize={14} />
              <Bar dataKey="orders" fill="#3b82f6" radius={[4,4,0,0]} maxBarSize={14} />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-3 flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-xs" style={{ color:"var(--text-3)" }}><span className="h-2 w-2 rounded-full" style={{ background:"#22c55e" }} />New Users</span>
            <span className="flex items-center gap-1.5 text-xs" style={{ color:"var(--text-3)" }}><span className="h-2 w-2 rounded-full" style={{ background:"#3b82f6" }} />Orders</span>
          </div>
        </BentoCard>
      </BentoGrid>
    </div>
  );
}
