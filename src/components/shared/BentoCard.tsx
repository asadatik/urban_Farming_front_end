"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  hoverable?: boolean;
  delay?: number;
  span?: "1" | "2" | "3" | "full";
  style?: React.CSSProperties;
  onClick?: () => void;
}

const spanClass: Record<string, string> = {
  "1":    "col-span-1",
  "2":    "col-span-2",
  "3":    "col-span-3",
  "full": "col-span-full",
};

export function BentoCard({
  children,
  className,
  glow = false,
  hoverable = true,
  delay = 0,
  span = "1",
  style,
  onClick,
}: BentoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay, ease: [0.4, 0, 0.2, 1] }}
      whileHover={hoverable ? { y: -2, transition: { duration: 0.2 } } : undefined}
      onClick={onClick}
      className={cn(
        "relative overflow-hidden rounded-[20px] p-5",
        "border border-slate-800/80",
        hoverable && "cursor-pointer",
        spanClass[span],
        className
      )}
      style={{
        background: "linear-gradient(145deg, #0f172a 0%, #0c1525 100%)",
        boxShadow: glow
          ? "0 0 0 1px rgba(16,185,129,0.15), 0 4px 24px rgba(0,0,0,0.4), 0 0 20px rgba(16,185,129,0.08)"
          : "0 1px 3px rgba(0,0,0,0.5), 0 0 0 1px rgba(30,41,59,0.5)",
        ...style,
      }}
    >
      {/* Top shine */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)" }}
      />

      {/* Hover border glow overlay */}
      {hoverable && (
        <div className="pointer-events-none absolute inset-0 rounded-[20px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ boxShadow: "inset 0 0 0 1px rgba(16,185,129,0.15)" }}
        />
      )}

      {glow && (
        <div
          className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)" }}
        />
      )}

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

export function BentoGrid({
  children,
  cols = 3,
  className,
}: {
  children: React.ReactNode;
  cols?: 2 | 3 | 4;
  className?: string;
}) {
  const colsClass: Record<number, string> = {
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
  };
  return (
    <div className={cn("grid gap-4", colsClass[cols], className)}>
      {children}
    </div>
  );
}
