"use client";
import { motion } from "framer-motion";
import { ShoppingBag, Leaf, TrendingUp, Sprout, ArrowRight, CheckCircle2, Package, Clock } from "lucide-react";
import { BentoCard, BentoGrid } from "@/components/shared/BentoCard";
import { StatCard } from "@/components/shared/StatCard";
import { useMyOrders, useMyTrackings } from "@/hooks/useApi";
import { useAuthStore } from "@/lib/stores/authStore";
import Link from "next/link";
import { cn, formatCurrency, formatDate } from "@/lib/utils";

const STAGES = ["SEEDLING","GROWING","FLOWERING","FRUITING","HARVESTING","HARVESTED"];
const STAGE_COLORS: Record<string,string> = { SEEDLING:"#3b82f6",GROWING:"#22c55e",FLOWERING:"#f59e0b",FRUITING:"#f97316",HARVESTING:"#8b5cf6",HARVESTED:"#6ee7b7" };
const ORDER_ICON: Record<string,React.ElementType> = { DELIVERED:CheckCircle2, SHIPPED:Package, PENDING:Clock, CANCELLED:Clock, CONFIRMED:Package };
const ORDER_STYLE: Record<string,string> = { DELIVERED:"pill-success",SHIPPED:"pill-info",PENDING:"pill-pending",CANCELLED:"pill-error",CONFIRMED:"pill-info" };

export function CustomerDashboard() {
  const { user } = useAuthStore();
  const { data: ordersData, isLoading: ordersLoading } = useMyOrders(1);
  const { data: plants, isLoading: plantsLoading } = useMyTrackings();

  const orders  = ordersData?.data ?? [];
  const plantList = plants ?? [];
  const activePlant = plantList.find(p => p.status !== "HARVESTED");

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Active Plants"   value={plantsLoading ? "—" : String(plantList.filter(p=>p.status!=="HARVESTED").length)} icon={<Sprout size={15}/>} delay={0} />
        <StatCard label="Total Orders"    value={ordersLoading ? "—" : String(ordersData?.meta?.total ?? orders.length)} icon={<ShoppingBag size={15}/>} delay={0.05} />
        <StatCard label="Spaces Rented"  value="2"                    icon={<Leaf size={15}/>} delay={0.1} />
        <StatCard label="Eco Score"       value="82%"                  icon={<TrendingUp size={15}/>} accent="#22c55e" delay={0.15} />
      </div>

      <BentoGrid cols={3}>
        {/* Plant tracking card */}
        <BentoCard span="2" glow delay={0.1} className="col-span-3 lg:col-span-2" hoverable={false}>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color:"var(--text-3)" }}>Active Tracking</p>
              {activePlant ? (
                <h3 className="mt-0.5 text-base font-bold text-white" style={{ fontFamily:"var(--font-jakarta)" }}>
                  {activePlant.plantName} <span className="text-xs font-normal" style={{ color:"var(--text-3)" }}>{activePlant.rentalSpace?.location ?? activePlant.rentalSpaceId}</span>
                </h3>
              ) : (
                <h3 className="mt-0.5 text-sm font-semibold" style={{ color:"var(--text-2)" }}>No plants tracked yet</h3>
              )}
            </div>
            {activePlant && <span className="pill-success pill">{activePlant.status}</span>}
          </div>

          {activePlant ? (
            <div className="relative mt-6">
              <div className="absolute left-0 top-[9px] right-0 h-px" style={{ background:"rgba(255,255,255,0.06)" }} />
              {(() => {
                const idx = STAGES.indexOf(activePlant.status);
                const color = STAGE_COLORS[activePlant.status] ?? "#22c55e";
                return (
                  <div className="absolute left-0 top-[9px] h-px transition-all duration-700"
                    style={{ width:`${(idx/(STAGES.length-1))*100}%`, background:`linear-gradient(90deg,${color},${color}60)` }} />
                );
              })()}
              <div className="relative flex justify-between">
                {STAGES.map((stage, si) => {
                  const idx = STAGES.indexOf(activePlant.status);
                  const color = STAGE_COLORS[activePlant.status] ?? "#22c55e";
                  return (
                    <div key={stage} className="flex flex-col items-center gap-2">
                      <div className="relative z-10 flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 transition-all"
                        style={{ borderColor: si<=idx ? color : "rgba(255,255,255,0.08)", background: si<idx ? color : si===idx ? `${color}25` : "rgba(0,0,0,0.5)" }}>
                        {si<idx && <div className="h-1.5 w-1.5 rounded-full bg-black" />}
                        {si===idx && <motion.div animate={{ scale:[1,1.4,1] }} transition={{ duration:1.5,repeat:Infinity }} className="h-2 w-2 rounded-full" style={{ background:color }} />}
                      </div>
                      <span className="text-[9px] uppercase" style={{ color: si<=idx ? color : "rgba(255,255,255,0.15)" }}>{stage.slice(0,4)}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 py-10">
              <span className="text-3xl">🌱</span>
              <p className="text-sm" style={{ color:"var(--text-3)" }}>Rent a garden space and start tracking</p>
              <Link href="/rentals" className="rounded-xl border border-white/08 px-4 py-2 text-xs text-zinc-400 transition-all hover:border-white/16 hover:text-white">Browse Spaces</Link>
            </div>
          )}

          {activePlant?.healthNotes && (
            <p className="mt-4 rounded-xl border border-white/04 bg-white/02 px-3 py-2 text-xs leading-relaxed" style={{ color:"var(--text-2)" }}>{activePlant.healthNotes}</p>
          )}
        </BentoCard>

        {/* Eco score */}
        <BentoCard delay={0.15} className="col-span-3 lg:col-span-1" hoverable={false}>
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color:"var(--text-3)" }}>Sustainability</p>
          <h3 className="mt-0.5 text-sm font-bold text-white" style={{ fontFamily:"var(--font-jakarta)" }}>Eco Score</h3>
          <div className="mt-5 flex items-center justify-center">
            <div className="relative flex h-28 w-28 items-center justify-center">
              <svg className="absolute -rotate-90" width="112" height="112" viewBox="0 0 112 112">
                <circle cx="56" cy="56" r="48" stroke="rgba(255,255,255,0.06)" strokeWidth="8" fill="none" />
                <motion.circle cx="56" cy="56" r="48" stroke="#22c55e" strokeWidth="8" fill="none" strokeLinecap="round"
                  strokeDasharray={`${2*Math.PI*48}`}
                  initial={{ strokeDashoffset: 2*Math.PI*48 }}
                  whileInView={{ strokeDashoffset: 2*Math.PI*48*0.18 }}
                  viewport={{ once:true }} transition={{ duration:1.5,ease:"easeOut" }} />
              </svg>
              <div className="text-center">
                <span className="text-2xl font-bold text-white" style={{ fontFamily:"var(--font-mono)" }}>82</span>
                <p className="text-xs" style={{ color:"var(--text-3)" }}>/ 100</p>
              </div>
            </div>
          </div>
          <div className="mt-5 space-y-2">
            {[["Organic Purchases",90],["Local Sourcing",75],["Water Efficiency",80]].map(([label,pct]) => (
              <div key={label as string}>
                <div className="mb-1 flex justify-between text-xs" style={{ color:"var(--text-3)" }}><span>{label}</span><span>{pct}%</span></div>
                <div className="h-1 rounded-full" style={{ background:"rgba(255,255,255,0.06)" }}>
                  <motion.div initial={{ width:0 }} animate={{ width:`${pct}%` }} transition={{ duration:0.8,delay:0.4 }}
                    className="h-1 rounded-full" style={{ background:"linear-gradient(90deg,#22c55e,#86efac)" }} />
                </div>
              </div>
            ))}
          </div>
        </BentoCard>

        {/* Recent orders */}
        <BentoCard span="full" hoverable={false} delay={0.2}>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color:"var(--text-3)" }}>Activity</p>
              <h3 className="mt-0.5 text-sm font-bold text-white" style={{ fontFamily:"var(--font-jakarta)" }}>Recent Orders</h3>
            </div>
            <Link href="/dashboard/customer/orders" className="flex items-center gap-1 text-xs transition-colors hover:text-white" style={{ color:"#22c55e" }}>
              View all <ArrowRight size={10} />
            </Link>
          </div>
          {ordersLoading ? (
            <div className="space-y-2">{Array(3).fill(0).map((_,i)=><div key={i} className="h-14 rounded-xl" style={{ background:"rgba(255,255,255,0.03)",animation:"pulse 2s infinite" }} />)}</div>
          ) : orders.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-8 text-center">
              <ShoppingBag size={28} className="text-zinc-800" />
              <p className="text-sm" style={{ color:"var(--text-3)" }}>No orders yet</p>
              <Link href="/marketplace" className="text-xs" style={{ color:"#22c55e" }}>Browse marketplace →</Link>
            </div>
          ) : orders.slice(0,4).map((order, i) => {
            const Icon = ORDER_ICON[order.status] ?? Clock;
            return (
              <motion.div key={order.id} initial={{ opacity:0,x:-8 }} animate={{ opacity:1,x:0 }} transition={{ delay:i*0.07+0.3 }}
                className="mb-2 flex items-center gap-4 rounded-xl border border-white/04 bg-white/02 px-4 py-3 transition-all hover:border-white/08">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ background:"rgba(255,255,255,0.04)" }}>
                  <Icon size={14} className="text-zinc-500" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-zinc-200">{order.produce?.name ?? `Order #${order.id.slice(-6)}`}</p>
                  <p className="text-xs" style={{ color:"var(--text-3)" }}>Qty {order.quantity} · {formatDate(order.orderDate)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-zinc-200">{formatCurrency(Number(order.totalPrice))}</p>
                  <span className={cn("text-2xs", ORDER_STYLE[order.status] ?? "pill-neutral")} style={{ display:"inline-flex",padding:"1px 8px",borderRadius:9999,fontSize:"0.6rem",fontWeight:500 }}>
                    {order.status}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </BentoCard>
      </BentoGrid>
    </div>
  );
}
