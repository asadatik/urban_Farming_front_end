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
      else setCount(Math.floor(start));
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(72px,8vw,96px)", fontWeight: 500, color: "#fff", letterSpacing: -3 }}>
      {count}{suffix}
    </span>
  );
}

const STATS = [
  { target: 98, suffix: "%", label: "Decision Accuracy", sub: "↑ 4% vs last year" },
  { target: 4.8, suffix: "★", label: "Customer Rating", sub: "Based on 12K reviews" },
  { target: 300, suffix: "+", label: "Daily Active Farmers", sub: "↑ 23% growth" },
];

const PHOTOS = [
  { src: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&q=75", caption: "Urban Gardens" },
  { src: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=500&q=75", caption: "Fresh Produce" },
  { src: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=500&q=75", caption: "Community Farms" },
];

export default function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section style={{ background: "#000", padding: "120px 80px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <div ref={ref} style={{ height: 1, marginBottom: 80, background: "rgba(255,255,255,0.06)", position: "relative", overflow: "hidden" }}>
          <motion.div
            animate={inView ? { width: "100%" } : { width: "0%" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ position: "absolute", top: 0, left: 0, height: "100%", background: "linear-gradient(to right,transparent,#22c55e,transparent)" }}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 0 }}>
          {STATS.map(({ target, suffix, label, sub }, i) => (
            <div key={i} style={{ flex: 1, textAlign: "center", borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.08)" : "none", padding: "0 40px" }}>
              <CountUp target={target} suffix={suffix} />
              <p style={{ fontFamily: "var(--font-dm)", fontSize: 14, color: "var(--text-3)", marginTop: 12 }}>{label}</p>
              <p style={{ fontFamily: "var(--font-dm)", fontSize: 12, color: "rgba(34,197,94,0.7)", marginTop: 4 }}>{sub}</p>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 12, marginTop: 72 }}>
          {PHOTOS.map(({ src, caption }, i) => (
            <div key={i} style={{ flex: 1, height: 180, borderRadius: 16, overflow: "hidden", position: "relative", cursor: "pointer", transition: "transform 0.4s" }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <Image src={src} alt={caption} fill className="object-cover"
                onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/500x180/000/22c55e?text=${caption}`; }}
              />
              <div style={{ position: "absolute", bottom: 12, left: 12, background: "rgba(255,255,255,0.08)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 100, padding: "4px 12px" }}>
                <span style={{ fontFamily: "var(--font-dm)", fontSize: 11, color: "var(--text-2)" }}>{caption}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
