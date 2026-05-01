"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Play } from "lucide-react";
import { useRef } from "react";

const WORDS = [
  { text: "Grow", colorClass: "text-white" },
  { text: "Smarter.", colorClass: "text-white" },
  { text: "Live", colorClass: "text-white/30" },
  { text: "Greener.", colorClass: "text-[#22c55e]" },
];

const FLOAT_CARDS = [
  {
    delay: 0, rotateClass: "rotate-[1.5deg]",
    content: (
      <div>
        <div className="mb-3 flex items-center justify-between">
          <span className=" text-[13px] font-bold text-white">Farm Analytics</span>
          <div className="flex h-7 w-7 items-center justify-center rounded-[8px] border border-[#22c55e33] bg-[#22c55e26] text-sm text-[#22c55e]">↗</div>
        </div>
        <p className="mb-[14px] text-[11px] text-slate-300">Live growth tracking across 1,200+ farms</p>
        <div className="h-1 rounded-[100px] bg-white/[0.06]">
          <motion.div animate={{ width: ["0%", "78%"] }} transition={{ duration: 1.8, delay: 0.8 }}
            className="h-full rounded-[100px] bg-[#22c55e]" />
        </div>
        <p className="mt-[6px]  text-[10px] text-slate-300">78% harvest efficiency</p>
      </div>
    ),
  },
  {
    delay: 0.5, rotateClass: "-rotate-[1.2deg]",
    content: (
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#22c55e33] bg-[#22c55e1f] text-lg">🌿</div>
        <div>
          <div className=" text-[11px] font-semibold text-[#22c55e]">Eco Verified ✓</div>
          <div className=" text-[10px] text-slate-300">Sustainable Future</div>
        </div>
      </div>
    ),
  },
  {
    delay: 1, rotateClass: "rotate-[0.8deg]",
    content: (
      <div>
        <div className="mb-2 [font-family:var(--font-mono)] text-[26px] font-medium text-white">৳4.2M</div>
        <svg width="160" height="32" viewBox="0 0 160 32">
          {[18, 28, 14, 36, 22, 32, 20, 40, 26, 34].map((h, i) => (
            <motion.rect key={i} x={i * 16 + 2} y={32 - h} width={10} height={h} rx={3}
              fill={i === 9 ? "#22c55e" : "rgba(255,255,255,0.12)"}
              initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: i * 0.05 + 1.2 }}
              className="[transform-origin:bottom]" />
          ))}
        </svg>
        <p className="mt-[6px] [font-family:var(--font-dm)] text-[10px] text-slate-300">Monthly traded volume</p>
      </div>
    ),
  },
];

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const op = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-screen items-center overflow-hidden bg-black">
      {/* Background image with parallax */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">

        <Image
          src="https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?q=80&w=2000&auto=format&fit=crop"
          alt="Urban rooftop garden"
          fill
          className="object-cover opacity-60 saturate-125"
          onError={e => { (e.target as HTMLImageElement).src = "https://placehold.co/1800x900/000/22c55e?text=UrbanBloom"; }}
          priority />
          
        <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0.5)_45%,rgba(0,0,0,0.2)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,#000_0%,transparent_40%)]" />
      </motion.div>

      {/* Spotlight glow */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_60%_50%_at_30%_50%,rgba(34,197,94,0.12)_0%,transparent_70%)]" />

      <motion.div style={{ opacity: op }} className="relative z-10 mx-auto w-full max-w-7xl px-4 py-32 md:px-8 lg:px-10 lg:py-0 lg:min-h-screen lg:flex lg:items-center">
        <div className="flex w-full flex-col items-center gap-12 lg:flex-row lg:items-center lg:justify-between">

          {/* Left content */}
          <div className="max-w-2xl text-center lg:text-left">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.06] px-4 py-1.5 backdrop-blur-[12px]">
              <Sparkles size={11} className="text-[#22c55e]" />
              <span className="[font-family:var(--font-dm)] text-xs text-[var(--text-2)]">Now Live · Urban Farming Platform</span>
            </motion.div>

            <div className="mb-7 space-y-1">
              {WORDS.map((w, i) => (
                <motion.div key={w.text}
                  initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className={`block [font-family:var(--font-jakarta)] text-[clamp(56px,7vw,112px)] font-black leading-[0.95] tracking-[-3px] ${w.colorClass}`}>
                  {w.text}
                </motion.div>
              ))}
            </div>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.6 }}
              className="mb-8 max-w-[460px] [font-family:var(--font-dm)] text-[17px] leading-[1.7] text-zinc-500">
              The platform connecting urban farmers, buyers, and garden spaces — in one living ecosystem.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-col items-center gap-3 sm:flex-row lg:items-start">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Link href="/signup"
                  className="flex items-center gap-2 rounded-full bg-[#22c55e] px-7 py-3.5 [font-family:var(--font-jakarta)] text-[15px] font-bold text-black shadow-[0_0_28px_rgba(34,197,94,0.35)] transition-all hover:bg-[#16a34a]">
                  Start Growing <ArrowRight size={14} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                <Link href="/marketplace"
                  className="flex items-center gap-2 rounded-full border border-white/[0.14] px-7 py-3.5 [font-family:var(--font-dm)] text-[15px] font-medium text-white transition-all hover:bg-white/[0.06]">
                  <Play size={13} />Browse Market
                </Link>
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
              className="mt-8 flex items-center justify-center gap-3 lg:justify-start">
              <div className="flex">
                {[11, 12, 13, 14, 15].map((n, i) => (
                  <img key={n} src={`https://i.pravatar.cc/36?img=${n}`} alt="" width={28} height={28}
                    className={`rounded-full border-2 border-black ${i === 0 ? "ml-0" : "-ml-2"}`}
                    onError={e => { (e.target as HTMLImageElement).src = `https://placehold.co/28x28/22c55e/000?text=${n}`; }} />
                ))}
              </div>
              <span className="[font-family:var(--font-dm)] text-xs text-zinc-600">
                Trusted by <strong className="text-[var(--text-2)]">2,400+</strong> urban farmers
              </span>
            </motion.div>
          </div>

          {/* Right: floating cards */}
          <div className="relative hidden min-w-[280px] flex-col gap-4 lg:flex">
            {FLOAT_CARDS.map((card, i) => (
              <motion.div key={i}
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 3.5 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: card.delay }}
                className={`${card.rotateClass} min-w-[240px] rounded-[20px] border border-white/[0.1] bg-white/[0.06] px-[22px] py-5 backdrop-blur-[24px]`}>
                {card.content}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 z-10 h-12 w-px -translate-x-1/2 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.35),transparent)]" />
    </section>
  );
}
