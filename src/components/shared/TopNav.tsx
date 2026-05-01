"use client";

import { motion } from "framer-motion";
import { Search, Bell, ChevronDown, Command } from "lucide-react";
import { cn } from "@/lib/utils";

interface TopNavProps {
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export function TopNav({ title, subtitle, actions }: TopNavProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between px-6"
      style={{
        background: "rgba(2,6,23,0.8)",
        backdropFilter: "blur(16px) saturate(180%)",
        WebkitBackdropFilter: "blur(16px) saturate(180%)",
        borderBottom: "1px solid rgba(30,41,59,0.6)",
        boxShadow: "0 1px 0 rgba(255,255,255,0.02), 0 4px 16px rgba(0,0,0,0.3)",
      }}
    >
      {/* Left: Title */}
      <div>
        {title && (
          <h1
            className="text-base font-semibold text-slate-100"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            {title}
          </h1>
        )}
        {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
      </div>

      {/* Right: Search + actions */}
      <div className="flex items-center gap-2">
        {/* Search pill */}
        <button
          className={cn(
            "hidden md:flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs",
            "border border-slate-800 bg-slate-900/60 text-slate-500",
            "transition-all duration-200 hover:border-slate-700 hover:text-slate-400"
          )}
          style={{ minWidth: 180 }}
        >
          <Search size={12} />
          <span>Search anything...</span>
          <span className="ml-auto flex items-center gap-0.5 rounded-md border border-slate-700/50 bg-slate-800/50 px-1.5 py-0.5 text-2xs text-slate-500">
            <Command size={9} />K
          </span>
        </button>

        {/* Bell */}
        <button className="relative flex h-8 w-8 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/60 text-slate-500 transition-all duration-200 hover:border-slate-700 hover:text-slate-300">
          <Bell size={14} />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500" />
        </button>

        {actions}

        {/* Avatar */}
        <button className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 px-2.5 py-1.5 transition-all duration-200 hover:border-slate-700">
          <div
            className="flex h-5 w-5 items-center justify-center rounded-md text-2xs font-bold text-white"
            style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}
          >
            U
          </div>
          <ChevronDown size={11} className="text-slate-500" />
        </button>
      </div>
    </motion.header>
  );
}
