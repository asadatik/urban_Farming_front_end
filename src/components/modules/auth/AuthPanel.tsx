"use client";
import { motion } from "framer-motion";
import { Leaf, Sprout, ShieldCheck, BarChart3 } from "lucide-react";
import Link from "next/link";

const FEATURES = [
  { icon: Sprout,      text: "Real-time plant growth tracking" },
  { icon: ShieldCheck, text: "USDA & EU organic certification" },
  { icon: BarChart3,   text: "Vendor analytics dashboard" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};
const item = {
  hidden: { opacity: 0, x: -16 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] } },
};

interface AuthPanelProps {
  quote?: string;
  sub?: string;
}

export function AuthPanel({ quote = "Empowering Urban Farmers", sub = "Build a greener city, one garden plot at a time." }: AuthPanelProps) {
  return (
    <div className="relative hidden w-1/2 overflow-hidden lg:flex lg:flex-col lg:justify-between p-12">
      {/* Mesh background */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(145deg, #061018 0%, #020617 60%, #061a10 100%)" }} />
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 20% 40%, rgba(16,185,129,0.14) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 80% 80%, rgba(6,78,59,0.2) 0%, transparent 60%)" }} />
      <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: "radial-gradient(rgba(148,163,184,0.05) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

      {/* Decorative glow orb */}
      <div className="pointer-events-none absolute -left-24 top-1/3 h-64 w-64 rounded-full" style={{ background: "radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)", filter: "blur(1px)" }} />
      <div className="pointer-events-none absolute -bottom-12 -right-12 h-80 w-80 rounded-full" style={{ background: "radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)" }} />

      {/* Logo */}
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="relative z-10">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl" style={{ background: "linear-gradient(135deg,#10b981,#059669)", boxShadow: "0 0 16px rgba(16,185,129,0.4)" }}>
            <Leaf size={15} className="text-white" />
          </div>
          <span className="text-base font-bold text-white" style={{ fontFamily: "var(--font-jakarta)" }}>
            Urban<span className="text-emerald-400">Harvest</span>
          </span>
        </Link>
      </motion.div>

      {/* Center content */}
      <div className="relative z-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          <motion.p variants={item} className="text-xs font-medium uppercase tracking-widest text-emerald-500">
            Platform Mission
          </motion.p>

          <motion.h2
            variants={item}
            className="text-balance text-4xl font-extrabold leading-tight text-slate-100"
            style={{ fontFamily: "var(--font-jakarta)", textShadow: "0 0 40px rgba(16,185,129,0.2)" }}
          >
            {quote}
          </motion.h2>

          <motion.p variants={item} className="max-w-sm text-base leading-relaxed text-slate-400">
            {sub}
          </motion.p>

          <motion.div variants={item} className="space-y-3 pt-2">
            {FEATURES.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl" style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.2)" }}>
                  <Icon size={14} className="text-emerald-400" />
                </div>
                <span className="text-sm text-slate-300">{text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom quote */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="relative z-10"
      >
        <div className="rounded-2xl border border-slate-800/60 bg-slate-900/40 p-5" style={{ backdropFilter: "blur(12px)" }}>
          <p className="text-sm italic leading-relaxed text-slate-400">
            "My produce sales doubled in 3 months after joining the platform. The analytics alone are worth it."
          </p>
          <div className="mt-3 flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold text-white" style={{ background: "linear-gradient(135deg,#10b981,#059669)" }}>
              P
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-300">Priya Sharma</p>
              <p className="text-2xs text-slate-500">Vendor · Austin, TX</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
