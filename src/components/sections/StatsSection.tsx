"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (1.8 * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(target < 10 ? parseFloat(start.toFixed(1)) : Math.floor(start));
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} className="font-mono text-[clamp(64px,8vw,96px)] font-medium leading-none tracking-[-0.04em] text-white">
      {count}{suffix}
    </span>
  );
}

const STATS = [
  { target: 98,  suffix: "%", label: "Decision Accuracy", trend: "↑ 4% vs last year" },
  { target: 4.8, suffix: "★", label: "Customer Rating",   trend: "Based on 12K reviews" },
  { target: 300, suffix: "+", label: "Daily Active Farms", trend: "↑ 23% this month" },
];

const PHOTOS = [
  { src: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=700&q=85", caption: "Urban Gardens" },
  { src: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=700&q=85", caption: "Fresh Produce" },
  { src: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=700&q=85", caption: "Community Farms" },
];

export default function StatsSection() {
  const lineRef = useRef(null);
  const inView = useInView(lineRef, { once: true });

  return (
    <section className="border-t border-white/[0.06] bg-black section-pad">
      <div className="mx-auto max-w-[1240px]">

        {/* Animated scan line */}
        <div ref={lineRef} className="relative mb-20 h-px overflow-hidden bg-white/[0.05]">
          <motion.div
            animate={inView ? { width: "100%", opacity: 1 } : { width: "0%", opacity: 0 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-transparent via-emerald-500 to-transparent"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 divide-y divide-white/[0.06] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {STATS.map(({ target, suffix, label, trend }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-3 px-10 py-8 text-center sm:py-0"
            >
              {/* Number */}
              <CountUp target={target} suffix={suffix} />

              {/* Divider */}
              <div className="h-px w-10 bg-emerald-500/30" />

              {/* Label */}
              <p className="text-[13px] tracking-wide text-zinc-600">{label}</p>

              {/* Trend badge */}
              <span className="rounded-full border border-emerald-500/20 bg-emerald-500/[0.08] px-3 py-1 text-[11px] font-medium text-emerald-400">
                {trend}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Photo grid */}
        <div className="mt-20 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {PHOTOS.map(({ src, caption }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative h-[200px] cursor-pointer overflow-hidden rounded-[20px]"
            >
              <Image
                src={src}
                alt={caption}
                fill
                className="object-cover opacity-75 transition-all duration-700 group-hover:scale-[1.05] group-hover:opacity-90"
                onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/500x200/000/10b981?text=${caption}`; }}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              {/* Caption pill */}
              <div className="absolute bottom-4 left-4 rounded-full border border-white/[0.12] bg-black/50 px-3.5 py-1.5 backdrop-blur-md transition-all duration-300 group-hover:border-emerald-500/30">
                <span className="text-[11px] font-medium text-zinc-300">{caption}</span>
              </div>

              {/* Top-right corner glow on hover */}
              <div className="pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-full bg-emerald-500/10 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}