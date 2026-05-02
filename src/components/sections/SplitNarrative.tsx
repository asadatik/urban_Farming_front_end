"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Check } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 48 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

const MAIN_IMAGE = "/images/home/split_dp.webp";
const THUMBNAILS = [
  "/images/home/thumb-1.webp",
  "/images/home/thumb-2.webp",
  "/images/home/thumb-3.webp",
];

const STATS = [
  ["7,000+", "Active Farms"],
  ["57.2K", "Verified Users"],
  ["8,721+", "Eco Solutions"],
];

const FEATURES = [
  "Real-time IoT growth monitoring",
  "Verified organic supply chain",
  "Zero-waste last-mile delivery",
];

const TAGS = [
  "Tech & Nature",
  "Green Farming",
  "Cleaner World",
];

export function SplitNarrative() {
  return (
    <section className="bg-black section-pad">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 items-start gap-16 lg:grid-cols-[55fr_45fr] lg:gap-20">

        {/* Left — sticky image stack */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="lg:sticky lg:top-24"
        >
          {/* Main image */}
          <div className="relative h-[400px] overflow-hidden rounded-[28px]  lg:h-[550px] border border-white/[0.05]">
            <Image
              src={MAIN_IMAGE}
              alt="Urban farm"
              fill
              priority
              className="object-cover brightness-[0.7] contrast-[1.1] saturate-[0.8]"
              onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/700x600/000/10b981?text=Farm"; }}
            />

<div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-emerald-500/15" />

            {/* floating pill on image */}
            <div className="absolute right-5 top-5 flex items-center gap-2 rounded-full border border-white/[0.1] bg-black/60 px-4 py-2 backdrop-blur-md">
              <motion.div
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
                className="size-[6px] rounded-full bg-emerald-500"
              />
              <span className="text-[11px] font-medium text-zinc-300">Live Farm Data</span>
            </div>
          </div>

          {/* Thumbnail strip (Using local imports) */}
          <div className="mt-3 grid grid-cols-3 gap-3">
            {THUMBNAILS.map((imgAsset, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}

                className="group   relative h-[125px] cursor-pointer overflow-hidden rounded-[14px] border border-white/[0.06] transition-all duration-300 hover:border-emerald-500/30"
              >
                <Image
                  src={imgAsset}
                  alt={`Farm thumbnail ${i + 1}`}
                  fill
                  className="object-cover  transition-all duration-300 brightness-[0.8] saturate-[0.7] group-hover:saturate-100"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right — content */}
        <div className="flex flex-col gap-6 pt-0 lg:pt-6">

          {/* Label + heading */}
          <motion.div {...fadeUp} transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>
            <p className="mb-5 font-heading text-[11px] font-semibold uppercase tracking-[3px] text-emerald-500">
              About the Platform
            </p>
            <h2 className="font-heading text-[clamp(34px,4.5vw,48px)] font-black leading-[1.02] tracking-[-0.04em] text-white">
              The intersection of<br />
              technology and{" "}
              <span className="text-emerald-400">nature.</span>
            </h2>
          </motion.div>

          {/* Body  */}
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-[15px] leading-[1.85] text-zinc-500"
          >
            From energy-saving gardens to smart harvest tracking, we're dedicated to preserving the planet while enhancing everyday urban life. Join us in building a harmonious balance between technology and nature —{" "}
            <span className="text-zinc-300">one farm at a time.</span>
          </motion.p>

          {/* Stats row */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex gap-8 border-t border-white/50 pt-8"
          >
            {STATS.map(([num, label], i) => (
              <div key={i} className={`flex-1 ${i > 0 ? "border-l border-white/50 pl-8" : ""}`}>
                <div className="font-mono text-[26px] font-medium tracking-tight text-emerald-400">{num}</div>
                <div className="mt-1 text-[11px] leading-snug text-zinc-500">{label}</div>
              </div>
            ))}
          </motion.div>

          {/* Feature checklist */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.75, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-3.5"
          >
            {FEATURES.map((item) => (
              <div key={item} className="flex items-center gap-3.5">
                <div className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-emerald-500/10 ring-1 ring-emerald-500/25">
                  <Check size={11} strokeWidth={2.5} className="text-emerald-400" />
                </div>
                <span className="text-[14px] text-zinc-300">{item}</span>
              </div>
            ))}
          </motion.div>

          {/* Tag pills */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.75, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap gap-2"
          >
            {TAGS.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-[12px] text-zinc-400 transition-colors duration-200 hover:border-emerald-500/25 hover:text-zinc-400"
              >
                {t}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}