"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Eye, EyeOff, Leaf, Loader2, ArrowRight, Check } from "lucide-react";
import { toast } from "sonner";
import { useAuthStore } from "@/lib/stores/authStore";
import { useRoleRedirect } from "@/hooks/useRoleRedirect";
import { authApi } from "@/lib/api/services";
import { cn } from "@/lib/utils";

const ROLES = [
  { value: "CUSTOMER", label: "Customer",     desc: "Buy produce & rent plots",   emoji: "🛒" },
  { value: "VENDOR",   label: "Urban Farmer", desc: "Sell produce & list spaces", emoji: "🌿" },
];

function getStrength(p: string) {
  if (!p) return { bars: 0, label: "", color: "" };
  const score = [p.length >= 8, /[A-Z]/.test(p), /\d/.test(p), /[^A-Za-z0-9]/.test(p)].filter(Boolean).length;
  return [
    { bars: 0, label: "", color: "" },
    { bars: 1, label: "Weak",   color: "#ef4444" },
    { bars: 2, label: "Fair",   color: "#f59e0b" },
    { bars: 3, label: "Good",   color: "#3b82f6" },
    { bars: 4, label: "Strong", color: "#22c55e" },
  ][score];
}

export default function SignupPage() {
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole]         = useState<"CUSTOMER" | "VENDOR">("CUSTOMER");
  const [show, setShow]         = useState(false);
  const [loading, setLoading]   = useState(false);
  const { setUser }             = useAuthStore();
  const redirect                = useRoleRedirect();
  const strength                = getStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) { toast.error("Fill in all fields."); return; }
    if (password.length < 8) { toast.error("Password must be at least 8 characters."); return; }
    setLoading(true);
    try {
      const res = await authApi.signup(name, email, password, role);
      const { user, accessToken } = res.data.data;
      setUser(user, accessToken);
      toast.success(`Welcome to UrbanBloom, ${user.name}! 🌱`);
      redirect(user.role, (user as any).vendorProfile?.farmLocation);
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? "Registration failed. Please try again.");
    } finally { setLoading(false); }
  };

  return (
    <div className="flex min-h-screen" style={{ background: "#000" }}>
      {/* Left panel */}
      <div className="relative hidden overflow-hidden lg:flex lg:w-1/2 lg:flex-col lg:justify-between p-12"
        style={{ background: "linear-gradient(145deg,#050e06,#000)", borderRight: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 70% 55% at 20% 45%,rgba(34,197,94,0.12) 0%,transparent 65%)" }} />
        <div className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.03) 1px,transparent 1px)", backgroundSize: "28px 28px" }} />
        <Link href="/" className="relative z-10 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl"
            style={{ background: "linear-gradient(135deg,#22c55e,#16a34a)", boxShadow: "0 0 16px rgba(34,197,94,0.35)" }}>
            <Leaf size={14} className="text-black" />
          </div>
          <span className="text-[15px] font-bold text-white" style={{ fontFamily: "var(--font-jakarta)" }}>
            Urban<span style={{ color: "#22c55e" }}>Bloom</span>
          </span>
        </Link>
        <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="relative z-10 space-y-6">
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#22c55e", fontFamily: "var(--font-dm)" }}>Join the Movement</p>
          <h2 className="text-4xl font-extrabold leading-tight text-white" style={{ fontFamily: "var(--font-jakarta)", letterSpacing: "-1.5px" }}>
            Urban farming<br />starts<br /><span style={{ color: "#22c55e" }}>here.</span>
          </h2>
          <p className="max-w-sm text-sm leading-relaxed" style={{ color: "var(--text-2)", fontFamily: "var(--font-dm)" }}>
            Create your free account and connect with 1,200+ urban farmers, access the organic marketplace, and grow your food with data-driven insights.
          </p>
          {[["🌱","Real-time plant tracking"], ["🏡","Garden space rentals"], ["📊","Vendor analytics"]].map(([e, t]) => (
            <div key={t} className="flex items-center gap-3">
              <span>{e}</span>
              <span className="text-sm" style={{ color: "var(--text-2)", fontFamily: "var(--font-dm)" }}>{t}</span>
            </div>
          ))}
        </motion.div>
        <div className="relative z-10 rounded-2xl border border-white/06 bg-white/02 p-5">
          <div className="mb-3 flex gap-0.5">{Array(5).fill(0).map((_,i) => <span key={i} style={{ color:"#22c55e",fontSize:14 }}>★</span>)}</div>
          <p className="mb-3 text-sm italic leading-relaxed" style={{ color: "var(--text-2)", fontFamily: "var(--font-dm)" }}>
            "UrbanBloom connected me directly to 200+ buyers. No middlemen. Pure growth."
          </p>
          <div className="flex items-center gap-2.5">
            <img src="https://i.pravatar.cc/32?img=20" alt="" width={28} height={28} className="rounded-lg"
              onError={e => { (e.target as HTMLImageElement).src = "https://placehold.co/28x28/22c55e/000?text=F"; }} />
            <div>
              <p className="text-xs font-semibold text-white">Farhan Rahman</p>
              <p className="text-xs" style={{ color: "var(--text-3)" }}>Rooftop Farmer, Dhaka</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex flex-1 flex-col items-center justify-center px-5 py-12">
        <div className="mb-7 flex items-center gap-2 lg:hidden">
          <div className="flex h-7 w-7 items-center justify-center rounded-xl" style={{ background: "linear-gradient(135deg,#22c55e,#16a34a)" }}>
            <Leaf size={13} className="text-black" />
          </div>
          <span className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-jakarta)" }}>Urban<span style={{ color: "#22c55e" }}>Bloom</span></span>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }} className="w-full max-w-[440px]">
          <div className="rounded-[28px] p-8"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(20px)", boxShadow: "0 24px 60px rgba(0,0,0,0.6)" }}>
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-jakarta)" }}>Create account</h1>
              <p className="mt-1 text-sm" style={{ color: "var(--text-3)", fontFamily: "var(--font-dm)" }}>Free forever. No credit card required.</p>
            </div>

            {/* Role selector */}
            <div className="mb-5 grid grid-cols-2 gap-2">
              {ROLES.map(({ value, label, desc, emoji }) => (
                <motion.button key={value} type="button" whileTap={{ scale: 0.97 }} onClick={() => setRole(value as any)}
                  className={cn("relative flex flex-col items-start gap-1.5 rounded-xl border p-3 text-left transition-all duration-200",
                    role === value ? "border-emerald-500/35" : "border-white/08 hover:border-white/16")}
                  style={role === value ? { background: "rgba(34,197,94,0.08)" } : { background: "rgba(255,255,255,0.02)" }}>
                  {role === value && (
                    <span className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full" style={{ background: "#22c55e" }}>
                      <Check size={9} className="text-black" strokeWidth={3} />
                    </span>
                  )}
                  <span className="text-base">{emoji}</span>
                  <span className="text-xs font-bold" style={{ color: role === value ? "#22c55e" : "#fff", fontFamily: "var(--font-jakarta)" }}>{label}</span>
                  <span className="text-xs" style={{ color: "var(--text-3)", fontFamily: "var(--font-dm)" }}>{desc}</span>
                </motion.button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { label: "Full name", val: name, set: setName, placeholder: "Jane Farmer", type: "text", auto: "name" },
                { label: "Email address", val: email, set: setEmail, placeholder: "you@example.com", type: "email", auto: "email" },
              ].map(({ label, val, set, placeholder, type, auto }) => (
                <div key={label}>
                  <label className="mb-1.5 block text-xs font-medium" style={{ color: "var(--text-3)" }}>{label}</label>
                  <input type={type} value={val} onChange={e => set(e.target.value)} placeholder={placeholder} autoComplete={auto} className="input-field" />
                </div>
              ))}
              <div>
                <label className="mb-1.5 block text-xs font-medium" style={{ color: "var(--text-3)" }}>Password</label>
                <div className="relative">
                  <input type={show ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="Min. 8 characters" autoComplete="new-password" className="input-field pr-10" />
                  <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors" style={{ color: "var(--text-3)" }}>
                    {show ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                <AnimatePresence>
                  {password && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-2">
                      <div className="flex gap-1">
                        {[1,2,3,4].map(n => (
                          <div key={n} className="h-1 flex-1 rounded-full transition-all duration-300"
                            style={{ background: n <= strength.bars ? strength.color : "rgba(255,255,255,0.06)" }} />
                        ))}
                      </div>
                      {strength.label && <p className="mt-1 text-xs font-medium" style={{ color: strength.color }}>{strength.label}</p>}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <motion.button type="submit" disabled={loading} whileTap={{ scale: 0.97 }}
                className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-black disabled:opacity-60"
                style={{ background: "linear-gradient(135deg,#22c55e,#16a34a)", boxShadow: "0 0 20px rgba(34,197,94,0.25)" }}>
                {loading ? <><Loader2 size={14} className="animate-spin" />Creating account...</> : <>Create Free Account <ArrowRight size={13} /></>}
              </motion.button>
              <p className="text-center text-xs" style={{ color: "var(--text-4)", fontFamily: "var(--font-dm)" }}>
                By signing up you agree to our <Link href="#" className="underline">Terms</Link> and <Link href="#" className="underline">Privacy Policy</Link>.
              </p>
            </form>
          </div>
          <p className="mt-5 text-center text-sm" style={{ color: "var(--text-3)", fontFamily: "var(--font-dm)" }}>
            Already have an account?{" "}
            <Link href="/login" className="font-medium transition-colors hover:text-white" style={{ color: "#22c55e" }}>Sign in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
