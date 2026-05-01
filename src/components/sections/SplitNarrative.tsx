"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const glass = { background: "var(--surface)", border: "1px solid var(--border)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderRadius: 20 };
const fadeUp = { initial: { opacity: 0, y: 48 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-80px" } };

export function SplitNarrative() {
  return (
    <section style={{ background: "#000", padding: "140px 80px" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto", display: "grid", gridTemplateColumns: "55fr 45fr", gap: 80, alignItems: "start" }}>
        <motion.div {...fadeUp} transition={{ duration: 0.75, ease: [0.22,1,0.36,1] }} style={{ position: "sticky", top: 100 }}>
          <div style={{ position: "relative", height: 640, borderRadius: 28, overflow: "hidden" }}>
            <Image src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=700&q=80" alt="Farm" fill className="object-cover"
              onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/700x640/000/22c55e?text=Farm"; }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,transparent 60%,rgba(0,0,0,0.4))" }} />
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            {["https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=300&q=70","https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=70","https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?w=300&q=70"].map((src, i) => (
              <div key={i} style={{ flex: 1, height: 80, borderRadius: 12, overflow: "hidden", cursor: "pointer", transition: "all 0.3s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "scale(1.04)"; (e.currentTarget as HTMLDivElement).style.border = "1px solid rgba(34,197,94,0.3)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "scale(1)"; (e.currentTarget as HTMLDivElement).style.border = "none"; }}
              >
                <Image src={src} alt="" width={300} height={80} className="object-cover w-full h-full"
                  onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/300x80/111/22c55e?text=photo"; }}
                />
              </div>
            ))}
          </div>
        </motion.div>

        <div style={{ paddingTop: 24 }}>
          <motion.div {...fadeUp} transition={{ duration: 0.75, delay: 0.1, ease: [0.22,1,0.36,1] }}>
            <p style={{ fontFamily: "var(--font-dm)", fontSize: 11, color: "#22c55e", textTransform: "uppercase", letterSpacing: 3, marginBottom: 24 }}>About the Platform</p>
            <h2 style={{ fontFamily: "var(--font-jakarta)", fontWeight: 900, fontSize: 40, letterSpacing: -1.5, lineHeight: 1.0, marginBottom: 24 }}>
              <span style={{ color: "#fff", display: "block" }}>The intersection of</span>
              <span style={{ color: "#fff", display: "block" }}>technology and</span>
              <span style={{ color: "#22c55e", display: "block" }}>nature.</span>
            </h2>
            <p style={{ fontFamily: "var(--font-dm)", fontSize: 16, color: "var(--text-2)", lineHeight: 1.8, maxWidth: 440, marginBottom: 40 }}>
              From energy-saving gardens to smart harvest tracking, we're dedicated to preserving the planet while enhancing everyday urban life. Join us in building a harmonious balance between technology and nature — one farm at a time.
            </p>
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.75, delay: 0.2, ease: [0.22,1,0.36,1] }}
            style={{ display: "flex", gap: 32, paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.06)", marginBottom: 36 }}
          >
            {[["7,000+","Active Tech Farms"],["57.2K","Verified Users"],["8,721+","Eco Solutions"]].map(([n, l], i) => (
              <div key={i}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 28, color: "#fff", fontWeight: 500 }}>{n}</div>
                <div style={{ fontFamily: "var(--font-dm)", fontSize: 12, color: "var(--text-3)", marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.75, delay: 0.25, ease: [0.22,1,0.36,1] }} style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
            {["Real-time IoT growth monitoring","Verified organic supply chain","Zero-waste last-mile delivery"].map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 20, height: 20, background: "rgba(34,197,94,0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 5l2 2 4-4" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
                </div>
                <span style={{ fontFamily: "var(--font-dm)", fontSize: 14, color: "var(--text-2)" }}>{item}</span>
              </div>
            ))}
          </motion.div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {["Intersection of tech & nature","Pioneering green farming","Creating a cleaner world"].map((t) => (
              <div key={t} style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: 100, padding: "8px 18px", fontFamily: "var(--font-dm)", fontSize: 12, color: "var(--text-2)" }}>{t}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function FullBleedGallery() {
  const text = "Experience the future of technology.".split("");
  return (
    <section style={{ position: "relative", height: "75vh", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ position: "absolute", inset: 0 }}>
        <Image src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1800&q=80" alt="Farm" fill className="object-cover"
          style={{ animation: "kenburns 8s ease-out forwards" }}
          onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/1800x900/000/22c55e?text=UrbanBloom"; }}
        />
      </div>
      <style>{`@keyframes kenburns{from{transform:scale(1.06)}to{transform:scale(1)}}`}</style>
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.55)" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "25%", background: "linear-gradient(to top,#000,transparent)" }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "20%", background: "linear-gradient(to bottom,#000,transparent)" }} />

      <div className="relative z-10" style={{ textAlign: "center", maxWidth: 800, padding: "0 40px" }}>
        <p style={{ fontFamily: "var(--font-dm)", fontSize: 11, color: "#22c55e", textTransform: "uppercase", letterSpacing: 3, marginBottom: 24, borderBottom: "1px solid rgba(34,197,94,0.3)", paddingBottom: 8, display: "inline-block" }}>Experience</p>
        <motion.h2 whileInView="visible" viewport={{ once: true }} style={{ fontFamily: "var(--font-jakarta)", fontWeight: 900, fontSize: "clamp(40px,6vw,80px)", letterSpacing: -2.5, lineHeight: 1.1, color: "#fff", marginBottom: 20 }}>
          {text.map((char, i) => (
            <motion.span key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: i * 0.015, duration: 0.3 }} viewport={{ once: true }}>{char === " " ? "\u00A0" : char}</motion.span>
          ))}
        </motion.h2>
        <motion.p {...fadeUp} transition={{ duration: 0.6, delay: 0.8 }} style={{ fontFamily: "var(--font-dm)", fontSize: 17, color: "var(--text-2)" }}>
          Pioneering green tech for eco-conscious living
        </motion.p>
      </div>

      <motion.div animate={{ y: [0,-8,0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: "absolute", left: 64, top: "50%", transform: "translateY(-50%)", ...glass, padding: "20px 24px", width: 200 }}
      >
        <div style={{ fontFamily: "var(--font-jakarta)", fontWeight: 700, fontSize: 14, color: "#fff", marginBottom: 6 }}>Green Innovation ↗</div>
        <p style={{ fontFamily: "var(--font-dm)", fontSize: 11, color: "var(--text-3)", marginBottom: 10 }}>Harmonious balance between nature and tech</p>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <motion.div animate={{ opacity: [1,0.3,1] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e" }} />
          <span style={{ fontFamily: "var(--font-dm)", fontSize: 10, color: "var(--text-3)" }}>Live data</span>
        </div>
      </motion.div>

      <motion.div animate={{ y: [0,-8,0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        style={{ position: "absolute", right: 64, top: "50%", transform: "translateY(-50%)", ...glass, padding: "20px 24px" }}
      >
        {[["7000+","Tech Nature"],["57.21K","Tech Solutions"],["8,721+","Environmental"]].map(([n, l], i) => (
          <div key={i} style={{ paddingTop: i > 0 ? 12 : 0, marginTop: i > 0 ? 12 : 0, borderTop: i > 0 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 16, color: "#fff", fontWeight: 500 }}>{n}</div>
            <div style={{ fontFamily: "var(--font-dm)", fontSize: 10, color: "var(--text-3)" }}>{l}</div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
