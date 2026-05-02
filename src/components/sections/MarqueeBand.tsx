"use client";
import { motion } from "framer-motion";

const ITEMS = [
  "1,200+ Active Farms",
  "৳4.2M Monthly Revenue",
  "Eco Certified",
  "578K+ Users",
  "8.4T CO₂ Saved",
  "Zero Waste Logistics",
  "Live IoT Tracking",
  "98% Satisfaction",
  "Bangladesh's #1 Platform",
];

function Band() {
  return (
    <div className="flex shrink-0 items-center gap-10 pr-10">
      {ITEMS.map((item, i) => (
        <div key={i} className="flex items-center gap-10">
          <span className="font-heading text-[11px] font-semibold uppercase tracking-[3px] text-zinc-200 whitespace-nowrap">
            {item}
          </span>
          <span className="size-[3px] shrink-0 rounded-full bg-emerald-500/40" />
        </div>
      ))}
    </div>
  );
}

export default function MarqueeBand() {
  return (
    <div className="overflow-hidden border-y border-white/30 bg-black py-[18px]">
      <motion.div
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        className="flex w-max"
      >
        <Band />
        <Band />
        <Band />
      </motion.div>
    </div>
  );
}