"use client";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Play, Leaf } from "lucide-react";
import { useRef, useEffect, useState } from "react";

const HEADLINE = ["Grow", "Smarter.", "Live", "Greener."];

const CARDS = [
  {
    delay: 0,
    rotate: "rotate-[2deg]",
    y: [0, -14, 0],
    dur: 3.8,
    content: (
      <div>
        <div className="mb-3 flex items-center justify-between">
          <span className="font-heading text-[13px] font-bold text-white">Farm Analytics</span>
          <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-xs">
            ↗
          </div>
        </div>
        <p className="mb-3 text-[11px] leading-relaxed text-zinc-400">Live growth tracking across 1,200+ farms</p>
        <div className="h-[3px] rounded-full bg-white/[0.07]">
          <motion.div
            animate={{ width: ["0%", "78%"] }}
            transition={{ duration: 2, delay: 1, ease: [0.22, 1, 0.36, 1] }}
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"
          />
        </div>
        <p className="mt-1.5 text-[10px] text-zinc-500">78% harvest efficiency</p>
      </div>
    ),
  },
  {
    delay: 0.6,
    rotate: "-rotate-[1.5deg]",
    y: [0, -10, 0],
    dur: 4.4,
    content: (
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10 text-xl">
          🌿
        </div>
        <div>
          <div className="font-heading text-[12px] font-semibold text-emerald-400">Eco Verified ✓</div>
          <div className="text-[11px] text-zinc-500">100% Sustainable Practices</div>
        </div>
      </div>
    ),
  },
  {
    delay: 1.1,
    rotate: "rotate-[1deg]",
    y: [0, -16, 0],
    dur: 5,
    content: (
      <div>
        <div className="mb-2 font-mono text-[28px] font-medium tracking-tight text-white">৳4.2M</div>
        <svg width="100%" height="32" viewBox="0 0 160 32">
          {[18, 28, 14, 36, 22, 32, 20, 40, 26, 34].map((h, i) => (
            <motion.rect
              key={i}
              x={i * 16 + 2} y={32 - h} width={10} height={h} rx={3}
              fill={i === 9 ? "#10b981" : "rgba(255,255,255,0.08)"}
              initial={{ scaleY: 0, originY: 1 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: i * 0.06 + 1.3, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "bottom" }}
            />
          ))}
        </svg>
        <p className="mt-1.5 text-[10px] text-zinc-500">Monthly traded volume</p>
      </div>
    ),
  },
];

const AVATARS = [11, 12, 13, 14, 15];

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  /* parallax */
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY  = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const fade = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  /* subtle mouse-follow glow */
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const glowX  = useSpring(useTransform(mouseX, [0, 1], ["-10%", "10%"]), { stiffness: 60, damping: 20 });
  const glowY  = useSpring(useTransform(mouseY, [0, 1], ["-10%", "10%"]), { stiffness: 60, damping: 20 });

  useEffect(() => {
    setMounted(true);
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  const stagger = (i: number) => ({
    initial: { opacity: 0, y: 56 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section ref={ref} className="relative flex min-h-screen items-center overflow-hidden bg-black">

      {/* ── Background image + parallax ── */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0 scale-[1.08]">
        <Image
          src="https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?q=80&w=2400&auto=format&fit=crop"
          alt="Urban rooftop farm"
          fill
          priority
          className="object-cover object-center saturate-[1.15]"
          onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/2400x1200/000/10b981?text=UrbanBloom"; }}
        />
        {/* layered darkening */}
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.55)_42%,rgba(0,0,0,0.18)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,#000_0%,transparent_36%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#000_0%,transparent_12%)]" />
      </motion.div>

      {/* ── Mouse-follow emerald glow ── */}
      {mounted && (
        <motion.div
          style={{ x: glowX, y: glowY }}
          className="pointer-events-none absolute inset-0 z-0"
        >
          <div className="absolute left-[20%] top-[30%] h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/[0.09] blur-[96px]" />
        </motion.div>
      )}

      {/* ── Content ── */}
      <motion.div
        style={{ opacity: fade }}
        className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-24 pt-32 md:px-10 lg:flex lg:min-h-screen lg:items-center lg:py-0"
      >
        <div className="flex w-full flex-col items-center gap-14 lg:flex-row lg:items-center lg:justify-between">

          {/* ── Left ── */}
          <div className="flex max-w-[640px] flex-col items-center text-center lg:items-start lg:text-left">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-1.5 backdrop-blur-xl"
            >
              <Leaf size={11} strokeWidth={2.5} className="text-emerald-400" />
              <span className="text-[12px] font-medium tracking-wide text-zinc-400">
                Now Live · Urban Farming Platform
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="mb-6 space-y-0">
              {HEADLINE.map((word, i) => (
                <motion.span
                  key={word}
                  {...stagger(i)}
                  className={`block font-heading text-[clamp(58px,7.5vw,118px)] font-black leading-[0.92] tracking-[-0.04em] ${
                    word === "Greener." ? "text-emerald-400" :
                    word === "Live"     ? "text-white/25"    :
                    "text-white"
                  }`}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.65 }}
              className="mb-9 max-w-[440px] text-[16px] leading-[1.75] text-zinc-500"
            >
              The platform connecting urban farmers, buyers, and garden spaces —{" "}
              <span className="text-zinc-300">in one living ecosystem.</span>
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.6 }}
              className="mb-9 flex flex-col items-center gap-3 sm:flex-row lg:items-start"
            >
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Link
                  href="/signup"
                  className="flex items-center gap-2 rounded-full bg-emerald-500 px-7 py-[14px] font-heading text-[14px] font-bold text-black shadow-[0_0_32px_rgba(16,185,129,0.4)] transition-all duration-300 hover:bg-emerald-400 hover:shadow-[0_0_44px_rgba(16,185,129,0.55)]"
                >
                  Start Growing <ArrowRight size={14} strokeWidth={2.5} />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/marketplace"
                  className="flex items-center gap-2.5 rounded-full border border-white/[0.12] bg-white/[0.04] px-7 py-[14px] text-[14px] font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-white/[0.2] hover:bg-white/[0.08]"
                >
                  <Play size={12} strokeWidth={2.5} className="fill-white" />
                  Browse Market
                </Link>
              </motion.div>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85 }}
              className="flex items-center gap-3"
            >
              <div className="flex">
                {AVATARS.map((n, i) => (
                  <img
                    key={n}
                    src={`https://i.pravatar.cc/40?img=${n}`}
                    alt=""
                    width={28}
                    height={28}
                    className={`h-7 w-7 rounded-full border-[1.5px] border-black object-cover ${i !== 0 ? "-ml-2" : ""}`}
                    onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/28x28/10b981/000?text=${n}`; }}
                  />
                ))}
              </div>
              <p className="text-[12px] text-zinc-600">
                Trusted by{" "}
                <span className="font-semibold text-zinc-300">2,400+</span>{" "}
                urban farmers
              </p>
            </motion.div>
          </div>

          {/* ── Right — floating cards ── */}
          <div className="relative hidden shrink-0 flex-col gap-4 lg:flex">

            {/* subtle glow behind cards */}
            <div className="pointer-events-none absolute -inset-10 rounded-[40px] bg-emerald-500/[0.06] blur-3xl" />

            {CARDS.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 32 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.14, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div
                  animate={{ y: card.y }}
                  transition={{ duration: card.dur, repeat: Infinity, ease: "easeInOut", delay: card.delay }}
                  className={`relative w-[268px] ${card.rotate} overflow-hidden rounded-[22px] border border-white/[0.09] bg-white/[0.05] p-5 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-2xl`}
                >
                  {/* inner top highlight */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  {card.content}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 9, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="h-10 w-px bg-gradient-to-b from-white/30 to-transparent"
        />
        <span className="text-[10px] tracking-[0.15em] text-zinc-600 uppercase">Scroll</span>
      </motion.div>
    </section>
  );
}