"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const CHAR_TEXT = "Experience the future of farming.";

const FLOAT_STATS = [
  ["7,000+", "Tech Farms"],
  ["57.2K", "Solutions"],
  ["8,721+", "Environmental"],
];

export function FullBleedGallery() {
  return (
    <section className="relative flex h-[78vh] min-h-[520px] items-center justify-center overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=2000&q=85"
          alt="Farm landscape"
          fill
          className="animate-[ken-burns_9s_ease-out_forwards] object-cover"
          onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/2000x900/000/10b981?text=UrbanBloom"; }}
        />
        <div className="absolute inset-0 bg-black/52" />
        <div className="absolute inset-x-0 top-0 h-[22%] bg-gradient-to-b from-black to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[28%] bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* Center content */}
      <div className="relative z-10 px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-block border-b border-emerald-500/30 pb-2 font-heading text-[11px] font-semibold uppercase tracking-[3px] text-emerald-500"
        >
          Experience
        </motion.p>

        <h2 className="mb-5 font-heading text-[clamp(38px,6vw,82px)] font-black leading-[1.08] tracking-[-0.04em] text-white">
          {CHAR_TEXT.split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.018, duration: 0.3 }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.85, duration: 0.6 }}
          className="text-[16px] text-zinc-400"
        >
          Pioneering green tech for eco-conscious living
        </motion.p>
      </div>

      {/* Left float card */}
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        animate={{ y: [0, -10, 0] }}
        className="absolute left-10 top-1/2 hidden -translate-y-1/2 rounded-[20px] border border-white/[0.09] bg-white/[0.05] p-5 backdrop-blur-2xl lg:block"
      >
        <p className="mb-1.5 font-heading text-[14px] font-bold text-white">Green Innovation ↗</p>
        <p className="mb-4 max-w-[160px] text-[11px] leading-relaxed text-zinc-600">
          Harmonious balance between nature and tech
        </p>
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="size-[6px] rounded-full bg-emerald-500"
          />
          <span className="text-[10px] text-zinc-600">Live data</span>
        </div>
      </motion.div>

      {/* Right float card */}
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        animate={{ y: [0, -10, 0] }}
        className="absolute right-10 top-1/2 hidden -translate-y-1/2 rounded-[20px] border border-white/[0.09] bg-white/[0.05] p-5 backdrop-blur-2xl lg:block"
      >
        {FLOAT_STATS.map(([num, label], i) => (
          <div
            key={i}
            className={`${i > 0 ? "mt-4 border-t border-white/[0.06] pt-4" : ""}`}
          >
            <div className="font-mono text-[17px] font-medium text-white">{num}</div>
            <div className="text-[10px] text-zinc-600">{label}</div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}