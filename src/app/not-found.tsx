"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Leaf } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center"
      style={{ background: "#000" }}>
      <div className="pointer-events-none fixed inset-0"
        style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.025) 1px,transparent 1px)", backgroundSize: "32px 32px" }} />
      <div className="pointer-events-none fixed inset-0"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 40%,rgba(34,197,94,0.07) 0%,transparent 70%)" }} />

      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col items-center">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl"
          style={{ background: "linear-gradient(135deg,#22c55e,#16a34a)", boxShadow: "0 0 32px rgba(34,197,94,0.3)" }}>
          <Leaf size={24} className="text-black" />
        </div>

        <p className="mb-2 text-xs font-semibold uppercase tracking-widest"
          style={{ color: "#22c55e", fontFamily: "var(--font-dm)" }}>404 — Page Not Found</p>

        <h1 className="mb-4 text-balance text-5xl font-extrabold text-white md:text-6xl"
          style={{ fontFamily: "var(--font-jakarta)", letterSpacing: "-2.5px", lineHeight: 1.05 }}>
          This plot<br />doesn't exist.
        </h1>

        <p className="mb-8 max-w-sm text-[15px] leading-relaxed"
          style={{ color: "var(--text-2)", fontFamily: "var(--font-dm)" }}>
          The page you're looking for has been moved, deleted, or never existed. Let's get you back to greener ground.
        </p>

        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link href="/"
              className="flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-black transition-colors"
              style={{ background: "#22c55e", fontFamily: "var(--font-jakarta)" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#16a34a")}
              onMouseLeave={e => (e.currentTarget.style.background = "#22c55e")}>
              <ArrowLeft size={14} />Back to Home
            </Link>
          </motion.div>
          <Link href="/marketplace"
            className="rounded-full border px-6 py-3 text-sm font-medium text-zinc-400 transition-all hover:border-white/20 hover:text-white"
            style={{ border: "1px solid rgba(255,255,255,0.1)", fontFamily: "var(--font-dm)" }}>
            Browse Marketplace
          </Link>
        </div>
      </motion.div>
    </div>
  );
}