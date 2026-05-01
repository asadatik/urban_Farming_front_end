"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  delta?: { value: number; label?: string };
  icon?: React.ReactNode;
  accent?: string;
  delay?: number;
  className?: string;
}

export function StatCard({ label, value, delta, icon, accent = "#10b981", delay = 0, className }: StatCardProps) {
  const isPositive = delta ? delta.value >= 0 : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay, ease: [0.4, 0, 0.2, 1] }}
      className={cn(
        "group relative overflow-hidden rounded-[20px] border border-slate-800/80 p-5",
        "transition-all duration-300",
        "hover:border-slate-700/80",
        className
      )}
      style={{
        background: "linear-gradient(145deg, #0f172a 0%, #0c1525 100%)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.5), 0 0 0 1px rgba(30,41,59,0.4)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-60"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)" }}
      />

      {/* Glow orb on hover */}
      <div
        className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(circle, ${accent}20 0%, transparent 70%)` }}
      />

      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">{label}</p>
          <p
            className="mt-2 text-2xl font-bold text-slate-100"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            {value}
          </p>

          {delta && (
            <div className={cn(
              "mt-1.5 flex items-center gap-1 text-xs font-medium",
              isPositive ? "text-emerald-400" : "text-red-400"
            )}>
              {isPositive
                ? <TrendingUp size={11} />
                : delta.value === 0
                ? <Minus size={11} />
                : <TrendingDown size={11} />
              }
              <span>{Math.abs(delta.value)}%</span>
              {delta.label && <span className="text-slate-500">{delta.label}</span>}
            </div>
          )}
        </div>

        {icon && (
          <div
            className="flex h-9 w-9 items-center justify-center rounded-xl"
            style={{
              background: `${accent}18`,
              border: `1px solid ${accent}25`,
              color: accent,
            }}
          >
            {icon}
          </div>
        )}
      </div>
    </motion.div>
  );
}
