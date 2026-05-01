"use client";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { BentoCard, BentoGrid } from "@/components/shared/BentoCard";
import { StatCard } from "@/components/shared/StatCard";
import { DollarSign, Package, Warehouse, Star, ArrowRight, AlertCircle, MapPin } from "lucide-react";
import { useVendorProduce, useVendorCerts } from "@/hooks/useApi";
import Link from "next/link";
import { cn, formatCurrency } from "@/lib/utils";

const MOCK_SALES = [
  { month:"Nov",revenue:1200 },{ month:"Dec",revenue:1900 },{ month:"Jan",revenue:1400 },
  { month:"Feb",revenue:2100 },{ month:"Mar",revenue:1800 },{ month:"Apr",revenue:2600 },
];

const Tip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-white/08 bg-black/90 p-3 text-xs backdrop-blur shadow-xl">
      <p className="mb-1 font-semibold text-zinc-300">{label}</p>
      <p style={{ color:"#22c55e" }}>Revenue: {formatCurrency(payload[0]?.value)}</p>
    </div>
  );
};

const CERT_PILL: Record<string,string> = { APPROVED:"pill-success",PENDING:"pill-pending",REJECTED:"pill-error" };

export function VendorDashboard() {
  const { data: produceData, isLoading: pLoad } = useVendorProduce();
  const { data: certs,       isLoading: cLoad } = useVendorCerts();

  const produce    = produceData?.data ?? [];
  const certList   = (certs as any[]) ?? [];
  const approvedCert = certList.find((c:any) => c.certificationStatus === "APPROVED");
  const totalRev   = MOCK_SALES.reduce((s,m) => s+m.revenue, 0);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total Revenue"    value={formatCurrency(totalRev)}  delta={{ value:22,label:"vs last month" }} icon={<DollarSign size={15}/>} delay={0} />
        <StatCard label="Active Listings"  value={pLoad?"—":String(produce.filter((p:any)=>p.isActive).length)} icon={<Package size={15}/>} delay={0.05} />
        <StatCard label="Cert Status"      value={approvedCert?"Approved":cLoad?"—":"Pending"} icon={<Warehouse size={15}/>} accent={approvedCert?"#22c55e":"#f59e0b"} delay={0.1} />
        <StatCard label="Avg Rating"       value="4.8★" icon={<Star size={15}/>} accent="#f59e0b" delay={0.15} />
      </div>

      <BentoGrid cols={3}>
        {/* Revenue chart */}
        <BentoCard span="2" hoverable={false} glow delay={0.1} className="col-span-3 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color:"var(--text-3)" }}>Revenue</p>
              <h3 className="mt-0.5 text-sm font-bold text-white" style={{ fontFamily:"var(--font-jakarta)" }}>6-Month Sales Analytics</h3>
            </div>
            <span className="pill-success pill">+22% MoM</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={MOCK_SALES} margin={{ top:4,right:4,bottom:0,left:-16 }}>
              <defs>
                <linearGradient id="rev-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#22c55e" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tick={{ fill:"rgba(255,255,255,0.25)",fontSize:11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill:"rgba(255,255,255,0.25)",fontSize:11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<Tip />} cursor={{ stroke:"rgba(255,255,255,0.05)" }} />
              <Area type="monotone" dataKey="revenue" stroke="#22c55e" strokeWidth={2} fill="url(#rev-grad)" dot={false} activeDot={{ r:4,fill:"#22c55e" }} />
            </AreaChart>
          </ResponsiveContainer>
        </BentoCard>

        {/* Cert status */}
        <BentoCard hoverable={false} delay={0.15} className="col-span-3 lg:col-span-1">
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color:"var(--text-3)" }}>Certifications</p>
          <h3 className="mt-0.5 text-sm font-bold text-white" style={{ fontFamily:"var(--font-jakarta)" }}>Cert Status</h3>
          {cLoad ? (
            <div className="mt-4 space-y-2">{Array(2).fill(0).map((_,i)=><div key={i} className="h-12 rounded-xl" style={{ background:"rgba(255,255,255,0.03)",animation:"pulse 2s infinite" }} />)}</div>
          ) : certList.length === 0 ? (
            <div className="mt-6 flex flex-col items-center gap-2 py-4 text-center">
              <p className="text-sm" style={{ color:"var(--text-3)" }}>No certifications yet</p>
              <Link href="/dashboard/vendor/certs" className="text-xs" style={{ color:"#22c55e" }}>Submit cert →</Link>
            </div>
          ) : certList.slice(0,3).map((c:any,i:number) => (
            <motion.div key={c.id} initial={{ opacity:0,x:8 }} animate={{ opacity:1,x:0 }} transition={{ delay:i*0.07+0.3 }}
              className="mt-2 flex items-center gap-3 rounded-xl border border-white/04 bg-white/02 p-3">
              <div className="flex-1 min-w-0">
                <p className="truncate text-xs font-medium text-zinc-300">{c.certifyingAgency}</p>
              </div>
              <span className={cn("text-2xs",CERT_PILL[c.certificationStatus]??"pill-neutral")} style={{ display:"inline-flex",padding:"1px 8px",borderRadius:9999,fontSize:"0.6rem",fontWeight:500 }}>
                {c.certificationStatus}
              </span>
            </motion.div>
          ))}
          <Link href="/dashboard/vendor/certs" className="mt-3 flex items-center gap-1 text-xs transition-colors hover:text-white" style={{ color:"#22c55e" }}>
            Manage certs <ArrowRight size={10} />
          </Link>
        </BentoCard>

        {/* Inventory */}
        <BentoCard span="full" hoverable={false} delay={0.2}>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color:"var(--text-3)" }}>Inventory</p>
              <h3 className="mt-0.5 text-sm font-bold text-white" style={{ fontFamily:"var(--font-jakarta)" }}>Produce Listings</h3>
            </div>
            <Link href="/dashboard/vendor/produce" className="flex items-center gap-1 text-xs transition-colors hover:text-white" style={{ color:"#22c55e" }}>
              Manage all <ArrowRight size={10} />
            </Link>
          </div>
          {pLoad ? (
            <div className="space-y-2">{Array(4).fill(0).map((_,i)=><div key={i} className="h-10 rounded-xl" style={{ background:"rgba(255,255,255,0.03)",animation:"pulse 2s infinite" }} />)}</div>
          ) : produce.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-8 text-center">
              <Package size={28} className="text-zinc-800" />
              <p className="text-sm" style={{ color:"var(--text-3)" }}>No produce listed yet</p>
              <Link href="/dashboard/vendor/produce" className="text-xs" style={{ color:"#22c55e" }}>Add first listing →</Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr style={{ borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
                    {["Product","Category","Price","Stock","Status"].map(h=>(
                      <th key={h} className="pb-2.5 text-left font-medium uppercase tracking-wider" style={{ color:"var(--text-3)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody style={{ borderTop:"none" }}>
                  {produce.slice(0,6).map((p:any,i:number)=>(
                    <tr key={p.id} className="transition-colors hover:bg-white/02" style={{ borderBottom:"1px solid rgba(255,255,255,0.03)" }}>
                      <td className="py-2.5 font-medium text-zinc-200">
                        <div className="flex items-center gap-1.5">
                          {p.availableQuantity < 20 && <AlertCircle size={10} className="text-amber-400 shrink-0" />}
                          {p.name}
                        </div>
                      </td>
                      <td className="py-2.5" style={{ color:"var(--text-3)" }}>{p.category}</td>
                      <td className="py-2.5 font-semibold text-zinc-300">{formatCurrency(Number(p.price))}</td>
                      <td className="py-2.5" style={{ color: p.availableQuantity<20?"#f59e0b":"var(--text-3)" }}>{p.availableQuantity}</td>
                      <td className="py-2.5">
                        <span className={cn("text-2xs",CERT_PILL[p.certificationStatus]??"pill-neutral")} style={{ display:"inline-flex",padding:"1px 8px",borderRadius:9999,fontSize:"0.6rem",fontWeight:500 }}>
                          {p.certificationStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </BentoCard>
      </BentoGrid>
    </div>
  );
}
