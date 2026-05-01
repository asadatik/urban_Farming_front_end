"use client";
import { motion } from "framer-motion";

const TESTIMONIALS = [
  { name: "Farhan Rahman",  role: "Rooftop Farmer, Dhaka",       img: 20, rotate: -0.8, quote: "UrbanBloom connected me directly to 200+ buyers. No middlemen. Pure growth.", location: "Dhaka North Farm" },
  { name: "Nisha Begum",    role: "Community Garden, Chittagong", img: 21, rotate: 0,    quote: "The rental platform made my rooftop garden profitable within the first season. Incredible.", location: "Chittagong Plots" },
  { name: "Arif Hossain",   role: "Organic Vendor, Sylhet",       img: 22, rotate: 0.6,  quote: "Real-time tracking gave my customers confidence. Orders doubled in 60 days.", location: "Sylhet Organics" },
  { name: "Sultana Parvin", role: "Hydroponic Farmer, Dhaka",     img: 23, rotate: -0.4, quote: "The analytics dashboard helps me optimize every planting cycle. This is the future of farming.", location: "Dhaka Hydroponics" },
  { name: "Karim Sheikh",   role: "Garden Renter, Narayanganj",   img: 24, rotate: 0.5,  quote: "Found my perfect rooftop plot in 10 minutes. The process was seamless and transparent.", location: "Narayanganj Hub" },
  { name: "Mitu Akter",     role: "Produce Buyer, Mirpur",        img: 25, rotate: -0.6, quote: "I know exactly where my vegetables come from. Live tracking gives me total peace of mind.", location: "Mirpur Market" },
];

export default function TestimonialsSection() {
  return (
    <section style={{ background: "#000", padding: "120px 80px" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 48 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.75, ease: [0.22,1,0.36,1] }}
          style={{ marginBottom: 64 }}
        >
          <p style={{ fontFamily: "var(--font-dm)", fontSize: 11, color: "#22c55e", textTransform: "uppercase", letterSpacing: 3, marginBottom: 16 }}>What Our Farmers Say</p>
          <h2 style={{ fontFamily: "var(--font-jakarta)", fontWeight: 900, fontSize: 48, letterSpacing: -1.5, lineHeight: 1.1 }}>
            <span style={{ color: "#fff" }}>Trusted by thousands</span><br />
            <span style={{ color: "#22c55e" }}>of urban growers.</span>
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22,1,0.36,1] }}
              style={{
                background: "var(--surface)", border: "1px solid var(--border)",
                borderRadius: 20, padding: "28px 24px",
                transform: `rotate(${t.rotate}deg)`,
                transition: "transform 0.3s, border-color 0.3s",
                cursor: "default",
              }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(34,197,94,0.25)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)"; }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <img src={`https://i.pravatar.cc/40?img=${t.img}`} alt={t.name} width={40} height={40}
                  style={{ borderRadius: "50%", flexShrink: 0 }}
                  onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/40x40/22c55e/000?text=${t.name[0]}`; }}
                />
                <div>
                  <div style={{ fontFamily: "var(--font-jakarta)", fontWeight: 700, fontSize: 14, color: "#fff" }}>{t.name}</div>
                  <div style={{ fontFamily: "var(--font-dm)", fontSize: 12, color: "var(--text-3)" }}>{t.role}</div>
                </div>
              </div>

              <div style={{ display: "flex", gap: 2, marginBottom: 14 }}>
                {Array(5).fill(0).map((_, s) => <span key={s} style={{ color: "#22c55e", fontSize: 14 }}>★</span>)}
              </div>

              <p style={{ fontFamily: "var(--font-dm)", fontSize: 15, color: "var(--text-2)", lineHeight: 1.75, marginBottom: 18 }}>
                "{t.quote}"
              </p>

              <div style={{ fontFamily: "var(--font-dm)", fontSize: 11, color: "var(--text-3)" }}>📍 {t.location}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
