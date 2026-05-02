"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 48 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

const STATS = [
  ["1.2K", "Farms"],
  ["-8.4T", "CO₂"],
  ["98%", "Score"],
];

const BOTTOM_CARDS = [
  {
    badge: "● Live",
    title: "Produce Marketplace",
    desc: "Fresh organic produce, sourced directly from verified urban farmers across the city.",
    stat: "৳4.2M",
    statLabel: "traded monthly",
    img: "/images/home/marketplace (2).webp",
    delay: 0.2,
  },
  {
    badge: "500+ Spaces",
    title: "Garden Rentals",
    desc: "Premium urban plots across Dhaka, ready to cultivate. Pick your neighbourhood.",
    tags: ["Dhaka North", "Gulshan", "Dhanmondi"],
    img: "/images/home/thumb-3.webp",
    delay: 0.28,
  },
];

const SPARKLINE = "0,50 25,40 50,45 75,25 100,30 125,15 150,20 175,10 200,5";
const circumference = 2 * Math.PI * 48;

export default function BentoFeatures() {
  const [hoveredA, setHoveredA] = useState(false);
  const [hoveredB, setHoveredB] = useState(false);

  return (
    <section className="bg-black section-pad">
      <div className="mx-auto max-w-[1240px]">

        {/* Header */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          <p className="mb-4 font-heading text-[11px] font-semibold uppercase tracking-[3px] text-emerald-500">
            Platform Features
          </p>
          <h2 className="font-heading text-[clamp(36px,5vw,56px)] font-black leading-[1.05] tracking-[-0.04em] text-white">
            Harness the power of{" "}
            <span className="text-emerald-400">green innovation</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">

          {/* Card A — hero image — FIXED and IMPROVED */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => setHoveredA(true)}
            onMouseLeave={() => setHoveredA(false)}
            className="relative col-span-1 h-[420px] cursor-pointer overflow-hidden rounded-[24px] md:col-span-2 group"
          >
            {/* Image layer*/}
            <Image
              src="https://i.ibb.co.com/7dQNt97j/pexels-lyn-ong-2836069-5005518.webp"
              alt="Urban farm"
              fill
              className={`object-cover brightness-[0.85] contrast-[1.15] saturate-[1] transition-transform duration-700 ${hoveredA ? "scale-[1.04]" : "scale-100"}`}
              onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/900x420/000/10b981?text=Farm"; }}
            />
            
            {/* NEW: Vignette Layer*/}
            <div className="absolute inset-0  bg-gradient-to-tr from-black via-black/30 to-transparent" />

            <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/15 via-transparent to-purple-950/20 mix-blend-color-dodge transition-opacity duration-300 group-hover:from-emerald-950/5 group-hover:to-purple-950/10" />

            {/* floating pill on image */}
            <div className="absolute right-5 top-5 rounded-full border border-white/[0.12] bg-white/[0.07] px-3 py-1.5 backdrop-blur-md">
              <span className="text-[12px] text-zinc-300">↗ Explore</span>
            </div>

            {/* Content Layer */}
            <div className="absolute bottom-3 left-5">
              <h3 className=" font-heading text-2xl font-extrabold text-white">Green Innovation</h3>
              <p className=" max-w-[360px] text-[13px] leading-relaxed text-zinc-400"> 
                Advanced urban farming technology for a sustainable tomorrow.
              </p>
              <motion.button
                whileHover={{ scale: 1.08, backgroundColor: "#10b981" }}
                whileTap={{ scale: 0.96 }}
                className=" mt-2  flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.08] text-lg text-white transition-colors duration-200"
              >
                ↗
              </motion.button>
            </div>
          </motion.div>

          {/* Card B — ring */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => setHoveredB(true)}
            onMouseLeave={() => setHoveredB(false)}
            className={`flex h-[420px] flex-col justify-between rounded-[24px] border p-7 backdrop-blur-xl transition-all duration-300 ${
              hoveredB ? "border-emerald-500/30 bg-emerald-500/[0.05]" : "border-white/[0.08] bg-emerald-500/5"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10 text-sm">
                  🌱
                </div>
                <span className="font-heading text-[13px] font-semibold text-zinc-300">Sustainable Growth</span>
              </div>
              <motion.div
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
                className="size-[7px] rounded-full bg-emerald-500"
              />
            </div>
            <div className="flex justify-center">
              <svg width="120" height="120" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="48" stroke="rgba(255,255,255,0.06)" strokeWidth="8" fill="none" />
                <motion.circle
                  cx="60" cy="60" r="48"
                  stroke="#10b981" strokeWidth="8" fill="none" strokeLinecap="round"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  whileInView={{ strokeDashoffset: circumference * 0.22 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.6, ease: "easeOut" }}
                  className="-rotate-90 [transform-origin:60px_60px]"
                />
                <text x="60" y="66" textAnchor="middle" fontSize="22" fontWeight="500" fill="#fff">78%</text>
              </svg>
            </div>
            <div className="flex">
              {STATS.map(([val, label], i) => (
                <div key={label} className={`flex-1 text-center ${i > 0 ? "border-l border-white/[0.06]" : ""}`}>
                  <div className="font-mono text-[13px] font-medium text-white">{val}</div>
                  <div className="mt-0.5 text-[10px] text-zinc-600">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Bottom cards — redesigned — FIXED and IMPROVED */}
          {BOTTOM_CARDS.map((card, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ duration: 0.75, delay: card.delay, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl transition-all duration-500 hover:border-emerald-500/20"
            >
     
              <div className="relative h-[176px] w-full overflow-hidden">
                <Image
                  src={card.img}
                  alt={card.title}
                  fill
                  // 
                  className="object-cover opacity-60 contrast-[1.1] transition-all duration-700 group-hover:scale-[1.06] group-hover:opacity-100 group-hover:saturate-[1.1]"
                  onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/600x176/0a0a0a/10b981?text=photo"; }}
                />
          

                {/* Badge */}
                <span className="absolute left-4 top-4 rounded-full border border-emerald-500/30 bg-black/70 px-3 py-1 text-[10px] font-semibold text-emerald-400 backdrop-blur-sm">
                  {card.badge}
                </span>

                {/* Arrow — appears on hover */}
                <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.15] bg-black/60 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                  <ArrowUpRight size={13} strokeWidth={2} />
                </div>
              </div>

              {/* Content */}
              <div className="p-3">
                <h3 className="mb-2 font-heading text-[18px] font-bold leading-snug text-white">
                  {card.title}
                </h3>
                <p className="text-[13px] leading-[1.75] text-zinc-400">{card.desc}</p>

                {/* Stat */}
                {card.stat && (
                  <div className="mt-2 border-t border-white/[0.06] pt-2">
                    <span className="font-mono text-[34px] font-medium leading-none tracking-tight text-white">
                      {card.stat}
                    </span>
                    <p className="mt-1 text-[11px] tracking-wide text-zinc-600">{card.statLabel}</p>
                  </div>
                )}

                {/* Location tags */}
                {card.tags && (
                  <div className="mt-3 flex flex-wrap gap-2 border-t border-white/[0.06] pt-4">
                    {card.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/[0.07] bg-emerald-500/10 px-3  text-[11px] font-medium text-zinc-300 transition-all duration-300 group-hover:border-emerald-500/20 group-hover:text-zinc-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom edge glow */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-emerald-500/25 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </motion.div>
          ))}

          {/* Card E — sparkline */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.75, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-between rounded-[24px] border border-white/[0.08] bg-white/[0.04] p-3 backdrop-blur-xl"
          >
            <div>
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10 text-[15px]">
                    📈
                  </div>
                  <motion.div
                    animate={{ opacity: [1, 0.2, 1] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                    className="size-[6px] rounded-full bg-emerald-500"
                  />
                </div>
                <span className="text-[12px] font-semibold text-emerald-400">+23% this week</span>
              </div>
              <h3 className="mb-1.5 font-heading text-[17px] font-bold text-white">Live Tracking</h3>
              <p className="text-[13px] leading-relaxed text-zinc-500">
                Real-time plant health and growth analytics.
              </p>
            </div>
            <svg viewBox="0 0 200 60" className="mt-4 w-full">
              <defs>
                <linearGradient id="spark-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(16,185,129,0.28)" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
              <polygon points={`${SPARKLINE} 200,60 0,60`} fill="url(#spark-grad)" />
              <motion.polyline
                points={SPARKLINE}
                fill="none" stroke="#10b981" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, ease: "easeOut" }}
              />
              <motion.circle
                cx="200" cy="5" r="3" fill="#10b981"
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              />
            </svg>
          </motion.div>
        </div>

        {/* Tag pills */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.75, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 flex flex-wrap gap-2.5"
        >
          {["Intersection of technology and nature", "Pioneering green tech for eco-conscious living"].map((t) => (
            <motion.div
              key={t}
              whileHover={{  color: "#10b981" }}
              className="cursor-pointer rounded-full border border-emerald-500/30 px-6 py-2.5 text-[13px] text-zinc-400 transition-colors duration-200"
            >
              {t}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}