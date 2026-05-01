"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const glass = { background: "var(--surface)", border: "1px solid var(--border)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", borderRadius: 24 };

const fadeUp = { initial: { opacity: 0, y: 48 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-80px" } };

export default function BentoFeatures() {
  const [hoveredA, setHoveredA] = useState(false);
  const [hoveredB, setHoveredB] = useState(false);

  return (
    <section style={{ background: "#000", padding: "140px 80px" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <motion.div {...fadeUp} transition={{ duration: 0.75, ease: [0.22,1,0.36,1] }} style={{ textAlign: "center", marginBottom: 72 }}>
          <p style={{ fontFamily: "var(--font-dm)", fontSize: 11, color: "#22c55e", textTransform: "uppercase", letterSpacing: 3, marginBottom: 16 }}>Platform Features</p>
          <h2 style={{ fontFamily: "var(--font-jakarta)", fontWeight: 900, fontSize: 52, letterSpacing: -2, lineHeight: 1.05, color: "#fff" }}>
            Harness the power of<br /><span style={{ color: "#22c55e" }}>green innovation</span>
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gridTemplateRows: "400px 220px", gap: 14 }}>
          {/* Card A — photo with parallax hover */}
          <motion.div {...fadeUp} transition={{ duration: 0.75, delay: 0.1, ease: [0.22,1,0.36,1] }}
            onMouseEnter={() => setHoveredA(true)} onMouseLeave={() => setHoveredA(false)}
            style={{ position: "relative", borderRadius: 24, overflow: "hidden", cursor: "pointer" }}
          >
            <Image src="https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=900&q=80" alt="Farm" fill
              className="object-cover" style={{ transition: "transform 0.5s ease", transform: hoveredA ? "scale(1.04)" : "scale(1)" }}
              onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/900x400/000/22c55e?text=Farm"; }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,0.92) 0%,transparent 55%)" }} />
            <div style={{ position: "absolute", top: 20, right: 20, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 100, padding: "6px 14px" }}>
              <span style={{ fontFamily: "var(--font-dm)", fontSize: 12, color: "var(--text-2)" }}>↗ Explore</span>
            </div>
            <div style={{ position: "absolute", bottom: 28, left: 28 }}>
              <h3 style={{ fontFamily: "var(--font-jakarta)", fontWeight: 800, fontSize: 22, color: "#fff", marginBottom: 8 }}>Green Innovation</h3>
              <p style={{ fontFamily: "var(--font-dm)", fontSize: 14, color: "#71717a", maxWidth: 380, marginBottom: 16 }}>Advanced urban farming technology for a sustainable tomorrow.</p>
              <button style={{ width: 44, height: 44, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 100, cursor: "pointer", fontSize: 18, transition: "background 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#22c55e")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
              >↗</button>
            </div>
          </motion.div>

          {/* Card B — sustainability ring */}
          <motion.div {...fadeUp} transition={{ duration: 0.75, delay: 0.15, ease: [0.22,1,0.36,1] }}
            onMouseEnter={() => setHoveredB(true)} onMouseLeave={() => setHoveredB(false)}
            style={{ ...glass, padding: 28, display: "flex", flexDirection: "column", justifyContent: "space-between", transition: "border-color 0.3s,background 0.3s", borderColor: hoveredB ? "rgba(34,197,94,0.3)" : "var(--border)", background: hoveredB ? "rgba(34,197,94,0.04)" : "var(--surface)" }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 32, height: 32, background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>🌱</div>
                <span style={{ fontFamily: "var(--font-jakarta)", fontWeight: 600, fontSize: 13, color: "var(--text-2)" }}>Sustainable Growth</span>
              </div>
              <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <svg width="120" height="120" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="48" stroke="rgba(255,255,255,0.06)" strokeWidth="8" fill="none" />
                <motion.circle cx="60" cy="60" r="48" stroke="#22c55e" strokeWidth="8" fill="none" strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 48}`} initial={{ strokeDashoffset: 2 * Math.PI * 48 }}
                  whileInView={{ strokeDashoffset: 2 * Math.PI * 48 * 0.22 }} viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeOut" }} style={{ transform: "rotate(-90deg)", transformOrigin: "60px 60px" }}
                />
                <text x="60" y="65" textAnchor="middle" style={{ fontFamily: "var(--font-mono)", fontSize: 22, fontWeight: 500, fill: "#fff" }}>78%</text>
              </svg>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {[["1.2K Farms","Farms"],["CO₂ -8.4T","Saved"],["98%","Satisfaction"]].map(([val, label], i) => (
                <div key={i} style={{ textAlign: "center", flex: 1, borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.06)" : "none", paddingLeft: i > 0 ? 12 : 0 }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "#fff", fontWeight: 500 }}>{val}</div>
                  <div style={{ fontFamily: "var(--font-dm)", fontSize: 10, color: "var(--text-3)", marginTop: 2 }}>{label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Cards C, D, E — bottom row */}
          {[
            { title: "Produce Marketplace", desc: "Fresh produce, directly from farmers.", stat: "৳4.2M", statLabel: "monthly traded", img: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400&q=75", badge: "● Live", delay: 0.2 },
            { title: "Garden Rentals", desc: "500+ urban plots across the city.", tags: ["Dhaka North","Gulshan","Dhanmondi"], img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=75", badge: "500+ Spaces", delay: 0.25 },
          ].map(({ title, desc, stat, statLabel, tags, img, badge, delay }, i) => (
            <motion.div key={i} {...fadeUp} transition={{ duration: 0.75, delay, ease: [0.22,1,0.36,1] }}
              style={{ ...glass, padding: 24, display: "flex", flexDirection: "column", justifyContent: "space-between", overflow: "hidden", position: "relative" }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <div style={{ width: 32, height: 32, background: "rgba(34,197,94,0.12)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>{i === 0 ? "🛒" : "🏡"}</div>
                  <span style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 100, padding: "3px 10px", fontFamily: "var(--font-dm)", fontSize: 10, color: "#22c55e" }}>{badge}</span>
                </div>
                <h3 style={{ fontFamily: "var(--font-jakarta)", fontWeight: 800, fontSize: 17, color: "#fff", marginBottom: 6 }}>{title}</h3>
                <p style={{ fontFamily: "var(--font-dm)", fontSize: 13, color: "var(--text-2)" }}>{desc}</p>
                {tags && <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 12 }}>{tags.map((t) => <span key={t} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 100, padding: "3px 10px", fontFamily: "var(--font-dm)", fontSize: 10, color: "var(--text-3)" }}>{t}</span>)}</div>}
                {stat && <div style={{ marginTop: 12 }}><span style={{ fontFamily: "var(--font-mono)", fontSize: 28, color: "#fff" }}>{stat}</span><div style={{ fontFamily: "var(--font-dm)", fontSize: 11, color: "var(--text-3)" }}>{statLabel}</div></div>}
              </div>
              <div style={{ position: "relative", height: 60, marginTop: 12, borderRadius: "0 0 16px 16px", overflow: "hidden" }}>
                <Image src={img} alt={title} fill className="object-cover" style={{ opacity: 0.6 }}
                  onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/400x60/111/22c55e?text=photo"; }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,var(--bg-2),transparent)" }} />
              </div>
            </motion.div>
          ))}

          {/* Card E — live tracking with sparkline */}
          <motion.div {...fadeUp} transition={{ duration: 0.75, delay: 0.3, ease: [0.22,1,0.36,1] }}
            style={{ ...glass, padding: 24, display: "flex", flexDirection: "column", justifyContent: "space-between" }}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 32, height: 32, background: "rgba(34,197,94,0.12)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>📈</div>
                  <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e" }} />
                </div>
                <span style={{ fontFamily: "var(--font-dm)", fontSize: 12, fontWeight: 600, color: "#22c55e" }}>+23% this week</span>
              </div>
              <h3 style={{ fontFamily: "var(--font-jakarta)", fontWeight: 800, fontSize: 17, color: "#fff", marginBottom: 6 }}>Live Tracking</h3>
              <p style={{ fontFamily: "var(--font-dm)", fontSize: 13, color: "var(--text-2)" }}>Real-time plant health and growth analytics.</p>
            </div>
            <svg viewBox="0 0 200 60" style={{ width: "100%", marginTop: 12 }}>
              <defs>
                <linearGradient id="spark" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(34,197,94,0.3)" /><stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
              <motion.polyline points="0,50 25,40 50,45 75,25 100,30 125,15 150,20 175,10 200,5"
                fill="none" stroke="#22c55e" strokeWidth="2"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
              <polygon points="0,50 25,40 50,45 75,25 100,30 125,15 150,20 175,10 200,5 200,60 0,60" fill="url(#spark)" />
            </svg>
          </motion.div>
        </div>

        <motion.div {...fadeUp} transition={{ duration: 0.75, delay: 0.4, ease: [0.22,1,0.36,1] }} style={{ display: "flex", gap: 10, marginTop: 20, flexWrap: "wrap" }}>
          {["Intersection of technology and nature","Pioneering green tech for eco-conscious living"].map((t) => (
            <div key={t} style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: 100, padding: "10px 24px", fontFamily: "var(--font-dm)", fontSize: 13, color: "var(--text-2)", cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(34,197,94,0.3)"; e.currentTarget.style.color = "#22c55e"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "var(--text-2)"; }}
            >{t}</div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
