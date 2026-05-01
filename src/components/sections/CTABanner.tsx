"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const PHOTOS = [
  "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=200&q=70",
  "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=200&q=70",
  "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=200&q=70",
];

export default function CTABanner() {
  return (
    <section style={{ background: "#000", padding: "0 80px 120px" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 48 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.75, ease: [0.22,1,0.36,1] }}
          style={{
            position: "relative", overflow: "hidden",
            border: "1px solid rgba(34,197,94,0.14)",
            background: "rgba(34,197,94,0.03)",
            borderRadius: 28, padding: "80px 48px", textAlign: "center",
          }}
        >
          {/* Pulsing glow */}
          <motion.div
            animate={{ opacity: [0.5,1,0.5], scale: [0.95,1.05,0.95] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%,-50%)",
              width: 600, height: 300, borderRadius: "50%",
              background: "radial-gradient(ellipse,rgba(34,197,94,0.07) 0%,transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {/* Corner leaf */}
          <svg width="200" height="200" viewBox="0 0 200 200" style={{ position: "absolute", top: -40, right: -40, opacity: 0.12, transform: "rotate(45deg)", pointerEvents: "none" }}>
            <path d="M100 10 Q180 10 190 100 Q180 180 100 190 Q20 180 10 100 Q20 20 100 10Z" stroke="#22c55e" strokeWidth="1.5" fill="none"/>
            <path d="M100 40 Q150 40 160 100 Q150 160 100 160 Q50 160 40 100 Q50 40 100 40Z" stroke="#22c55e" strokeWidth="1" fill="none"/>
          </svg>

          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(12px)", borderRadius: 100, padding: "6px 16px", marginBottom: 28 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "block" }} />
              <span style={{ fontFamily: "var(--font-dm)", fontSize: 12, color: "var(--text-2)" }}>Join the Movement</span>
            </div>

            <h2 style={{ fontFamily: "var(--font-jakarta)", fontWeight: 900, fontSize: "clamp(36px,4vw,56px)", letterSpacing: -1.5, color: "#fff", marginBottom: 16 }}>
              Ready to grow with us?
            </h2>

            <p style={{ fontFamily: "var(--font-dm)", fontSize: 16, color: "var(--text-2)", maxWidth: 480, margin: "0 auto 32px" }}>
              Join thousands of urban farmers already transforming Dhaka's rooftops into green havens.
            </p>

            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, marginBottom: 32 }}>
              {PHOTOS.map((src, i) => (
                <div key={i} style={{ width: 80, height: 56, borderRadius: 10, overflow: "hidden", marginLeft: i > 0 ? -8 : 0 }}>
                  <Image src={src} alt="" width={80} height={56} className="object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/80x56/111/22c55e?text=farm"; }}
                  />
                </div>
              ))}
              <span style={{ fontFamily: "var(--font-dm)", fontSize: 13, color: "var(--text-3)", marginLeft: 12 }}>Join 578M+ farmers</span>
            </div>

            <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Link href="/signup" style={{ background: "#22c55e", color: "#000", fontFamily: "var(--font-jakarta)", fontWeight: 800, fontSize: 15, padding: "15px 36px", borderRadius: 100, display: "block", transition: "background 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#16a34a")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#22c55e")}
                >Start Growing →</Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                <button style={{ border: "1px solid rgba(255,255,255,0.14)", color: "#fff", fontFamily: "var(--font-dm)", fontWeight: 500, fontSize: 15, padding: "15px 32px", borderRadius: 100, background: "transparent", cursor: "pointer" }}>
                  Talk to Our Team
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
