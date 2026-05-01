"use client";
import { motion } from "framer-motion";

const ITEMS = ["1,200+ Active Farms","৳4.2M Monthly Revenue","Eco Certified","578M+ Users","8.4T CO₂ Saved","Zero Waste Logistics","Live IoT Tracking","98% Satisfaction","Bangladesh's #1 Platform"];

const Band = () => (
  <div className="flex items-center gap-8 pr-8 flex-shrink-0">
    {ITEMS.map((item, i) => (
      <div key={i} className="flex items-center gap-8">
        <span className=" uppercase tracking-[2.5px] text-text-4 whitespace-nowrap">
          {item}
        </span>
        <span className="w-1 h-1 rounded-full bg-green-500/50 flex-shrink-0" />
      </div>
    ))}
  </div>
);

export default function MarqueeBand() {
  return (
    <div className="bg-black border-t border-white/5 border-b border-white/5 py-5 overflow-hidden">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        className="flex w-max"
      >
        <Band />
        <Band />
        <Band />
      </motion.div>
    </div>
  );
}