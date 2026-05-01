"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf, Shield, Zap, Globe, Users, TrendingUp, Heart } from "lucide-react";
import Navbar from "@/components/sections/Navbar";
import FooterSection from "@/components/sections/FooterSection";

const fadeUp = { initial: { opacity: 0, y: 32 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-60px" }, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } };

const TEAM = [
  { name: "Aryan Chowdhury", role: "CEO & Co-founder", bio: "Former urban agriculture researcher turned entrepreneur. Passionate about making farming accessible to everyone.", img: 20 },
  { name: "Nusrat Islam",     role: "CTO",              bio: "Full-stack engineer with 10+ years building marketplace platforms. Leads all technical architecture.", img: 22 },
  { name: "Rafiq Ahmed",      role: "Head of Ops",      bio: "Ex-logistics lead from Shohoz. Manages vendor relationships and supply chain.", img: 24 },
  { name: "Priya Sen",        role: "Design Lead",      bio: "Award-winning product designer. Obsessed with making complex data feel simple and beautiful.", img: 21 },
];

const VALUES = [
  { icon: Leaf,       label: "Sustainability",      desc: "Every decision we make is filtered through its environmental impact. Profit follows purpose." },
  { icon: Users,      label: "Community First",     desc: "We are a platform, not a corporation. Farmers and buyers are our co-builders, not just users." },
  { icon: Shield,     label: "Trust & Transparency", desc: "Every produce listing is certified, every vendor is verified, every transaction is traceable." },
  { icon: Zap,        label: "Innovation",          desc: "IoT sensors, real-time tracking, and data-driven insights bring modern tech to ancient practice." },
  { icon: Globe,      label: "Accessibility",       desc: "Urban farming should be available to anyone in any city, regardless of space or experience." },
  { icon: Heart,      label: "Food Security",       desc: "Our long-term mission is to reduce food deserts in metropolitan areas through distributed growing." },
];

const MILESTONES = [
  { year: "2021", title: "Founded in Dhaka", desc: "Started as a rooftop farming experiment with 12 families in Gulshan." },
  { year: "2022", title: "First 100 Vendors", desc: "Launched the certification program and onboarded 100 verified urban farmers." },
  { year: "2023", title: "Series A — $2M", desc: "Raised seed funding. Expanded to Chittagong and Sylhet." },
  { year: "2024", title: "IoT Tracking Launch", desc: "Launched real-time plant monitoring with sensor integrations." },
  { year: "2025", title: "1,200+ Active Farms", desc: "Now operating in 8 cities with ৳4.2M monthly transaction volume." },
];

export default function AboutPage() {
  return (
    <div style={{ background: "#000", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-20">
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 60% at 50% 0%,rgba(34,197,94,0.1) 0%,transparent 70%)" }} />
        <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.025) 1px,transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center md:px-8">
          <motion.div {...fadeUp} className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/04 px-4 py-1.5 backdrop-blur">
            <Leaf size={12} style={{ color: "#22c55e" }} />
            <span className="text-xs text-zinc-400" style={{ fontFamily: "var(--font-dm)" }}>Our Story</span>
          </motion.div>
          <motion.h1 {...fadeUp} transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-balance text-5xl font-extrabold text-white md:text-6xl lg:text-7xl"
            style={{ fontFamily: "var(--font-jakarta)", letterSpacing: "-3px", lineHeight: 1.0 }}>
            We're building the<br /><span style={{ color: "#22c55e" }}>future of food.</span>
          </motion.h1>
          <motion.p {...fadeUp} transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed" style={{ color: "var(--text-2)", fontFamily: "var(--font-dm)" }}>
            UrbanBloom was born from a simple question: what if every rooftop, balcony, and empty lot in Dhaka could feed someone? We built the infrastructure to make that possible.
          </motion.p>
        </div>
      </section>

      {/* Full bleed image */}
      <motion.section {...fadeUp} className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] px-4 md:px-8 lg:px-10" style={{ height: 480 }}>
        <Image src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1400&q=80" alt="Urban farm" fill className="object-cover"
          onError={e => { (e.target as HTMLImageElement).src = "https://placehold.co/1400x480/000/22c55e?text=UrbanBloom"; }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,0.8) 0%,rgba(0,0,0,0.2) 50%,transparent 100%)" }} />
        <div className="absolute bottom-10 left-10">
          <p className="text-4xl font-extrabold text-white" style={{ fontFamily: "var(--font-jakarta)", letterSpacing: "-2px" }}>Dhaka → Worldwide</p>
          <p className="mt-2 text-zinc-400" style={{ fontFamily: "var(--font-dm)" }}>Urban farming for every city</p>
        </div>
      </motion.section>

      {/* Mission */}
      <section className="section-pad">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div {...fadeUp}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: "#22c55e", fontFamily: "var(--font-dm)" }}>Our Mission</p>
              <h2 className="mb-5 text-4xl font-extrabold text-white md:text-5xl" style={{ fontFamily: "var(--font-jakarta)", letterSpacing: "-2px", lineHeight: 1.1 }}>
                Make urban farming<br /><span style={{ color: "#22c55e" }}>accessible to all.</span>
              </h2>
              <p className="mb-5 text-[15px] leading-relaxed text-zinc-500" style={{ fontFamily: "var(--font-dm)" }}>
                We connect aspiring farmers with land, connect farmers with buyers, and connect communities with their food supply. Our platform handles the marketplace, certifications, and tracking — so farmers can focus on growing.
              </p>
              <p className="mb-8 text-[15px] leading-relaxed text-zinc-500" style={{ fontFamily: "var(--font-dm)" }}>
                Every certification we issue, every plot we list, and every order we process moves us closer to cities where locally grown food is the default, not the exception.
              </p>
              <Link href="/marketplace" className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-black" style={{ background: "#22c55e", fontFamily: "var(--font-jakarta)" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#16a34a")}
                onMouseLeave={e => (e.currentTarget.style.background = "#22c55e")}>
                Explore the Platform <ArrowRight size={14} />
              </Link>
            </motion.div>
            <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-2 gap-4">
              {[["1,200+", "Active Farms"], ["৳4.2M", "Monthly Volume"], ["2,400+", "Verified Users"], ["98%", "Organic Certified"]].map(([n, l]) => (
                <div key={l} className="rounded-[20px] border border-white/06 p-6" style={{ background: "rgba(255,255,255,0.02)" }}>
                  <div className="mb-1 text-3xl font-extrabold text-white" style={{ fontFamily: "var(--font-mono)", letterSpacing: "-1px" }}>{n}</div>
                  <div className="text-xs text-zinc-600" style={{ fontFamily: "var(--font-dm)" }}>{l}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-pad" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <motion.div {...fadeUp} className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: "#22c55e", fontFamily: "var(--font-dm)" }}>Core Values</p>
            <h2 className="text-4xl font-extrabold text-white" style={{ fontFamily: "var(--font-jakarta)", letterSpacing: "-1.5px" }}>What we stand for</h2>
          </motion.div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map(({ icon: Icon, label, desc }, i) => (
              <motion.div key={label} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="group rounded-[20px] border border-white/06 p-6 transition-all duration-200 hover:border-white/12"
                style={{ background: "rgba(255,255,255,0.02)" }}>
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.15)" }}>
                  <Icon size={18} style={{ color: "#22c55e" }} />
                </div>
                <h3 className="mb-2 font-bold text-white" style={{ fontFamily: "var(--font-jakarta)", fontSize: 15 }}>{label}</h3>
                <p className="text-sm leading-relaxed text-zinc-600" style={{ fontFamily: "var(--font-dm)" }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-pad" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="mx-auto max-w-3xl px-4 md:px-8">
          <motion.div {...fadeUp} className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: "#22c55e", fontFamily: "var(--font-dm)" }}>Our Journey</p>
            <h2 className="text-4xl font-extrabold text-white" style={{ fontFamily: "var(--font-jakarta)", letterSpacing: "-1.5px" }}>Built milestone by milestone</h2>
          </motion.div>
          <div className="relative">
            <div className="absolute left-[68px] top-0 bottom-0 w-px bg-white/06" />
            {MILESTONES.map(({ year, title, desc }, i) => (
              <motion.div key={year} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="mb-8 flex gap-6 last:mb-0">
                <div className="w-14 shrink-0 text-right">
                  <span className="text-xs font-bold text-zinc-600" style={{ fontFamily: "var(--font-mono)" }}>{year}</span>
                </div>
                <div className="relative flex items-start">
                  <div className="absolute -left-[29px] top-1 z-10 flex h-4 w-4 items-center justify-center rounded-full border-2 border-black" style={{ background: "#22c55e" }} />
                  <div className="pl-4">
                    <h3 className="mb-1 font-bold text-white" style={{ fontFamily: "var(--font-jakarta)", fontSize: 15 }}>{title}</h3>
                    <p className="text-sm leading-relaxed text-zinc-600" style={{ fontFamily: "var(--font-dm)" }}>{desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-pad" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <motion.div {...fadeUp} className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: "#22c55e", fontFamily: "var(--font-dm)" }}>The Team</p>
            <h2 className="text-4xl font-extrabold text-white" style={{ fontFamily: "var(--font-jakarta)", letterSpacing: "-1.5px" }}>The people growing this</h2>
          </motion.div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map(({ name, role, bio, img }, i) => (
              <motion.div key={name} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group rounded-[20px] border border-white/06 p-5 transition-all duration-200 hover:border-white/12"
                style={{ background: "rgba(255,255,255,0.02)" }}>
                <img src={`https://i.pravatar.cc/80?img=${img}`} alt={name} width={52} height={52}
                  className="mb-4 rounded-2xl" style={{ border: "2px solid rgba(34,197,94,0.2)" }}
                  onError={e => { (e.target as HTMLImageElement).src = `https://placehold.co/52x52/22c55e/000?text=${name[0]}`; }} />
                <h3 className="mb-0.5 font-bold text-white" style={{ fontFamily: "var(--font-jakarta)", fontSize: 14 }}>{name}</h3>
                <p className="mb-3 text-xs" style={{ color: "#22c55e", fontFamily: "var(--font-dm)" }}>{role}</p>
                <p className="text-xs leading-relaxed text-zinc-600" style={{ fontFamily: "var(--font-dm)" }}>{bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="mx-auto max-w-2xl px-4 text-center md:px-8">
          <motion.div {...fadeUp} className="rounded-[32px] border border-emerald-500/14 bg-emerald-500/03 p-12" style={{ position: "relative", overflow: "hidden" }}>
            <motion.div animate={{ opacity: [0.5, 1, 0.5], scale: [0.95, 1.05, 0.95] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 400, height: 200, borderRadius: "50%", background: "radial-gradient(ellipse,rgba(34,197,94,0.07) 0%,transparent 70%)", pointerEvents: "none" }} />
            <h2 className="mb-3 text-3xl font-extrabold text-white" style={{ fontFamily: "var(--font-jakarta)", letterSpacing: "-1.5px" }}>Join the movement.</h2>
            <p className="mb-7 text-zinc-500" style={{ fontFamily: "var(--font-dm)" }}>Whether you're a farmer, buyer, or just curious — there's a place for you in UrbanBloom.</p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/signup" className="flex items-center gap-2 rounded-full px-7 py-3 text-sm font-bold text-black" style={{ background: "#22c55e", fontFamily: "var(--font-jakarta)" }}>Start for Free <ArrowRight size={13} /></Link>
              <Link href="/community" className="flex items-center gap-2 rounded-full border border-white/12 px-7 py-3 text-sm text-zinc-400 transition-all hover:border-white/20 hover:text-white">Visit Community</Link>
            </div>
          </motion.div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
