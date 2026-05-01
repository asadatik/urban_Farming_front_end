"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Eye, EyeOff, Leaf, Loader2, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useAuthStore } from "@/lib/stores/authStore";
import { useRoleRedirect } from "@/hooks/useRoleRedirect";
import { authApi } from "@/lib/api/services";

export default function LoginPage() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow]         = useState(false);
  const [loading, setLoading]   = useState(false);
  const { setUser }             = useAuthStore();
  const redirect                = useRoleRedirect();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { toast.error("Fill in all fields."); return; }
    setLoading(true);
    try {
      const res  = await authApi.login(email, password);
      const { user, accessToken } = res.data.data;
      setUser(user, accessToken);
      toast.success(`Welcome back, ${user.name}!`);
      redirect(user.role, (user as any).vendorProfile?.farmLocation);
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? "Invalid email or password.");
    } finally { setLoading(false); }
  };

  const fillDemo = (role: string) => {
    setEmail(`${role.toLowerCase()}@urbanfarming.com`);
    setPassword(`${role.charAt(0).toUpperCase() + role.slice(1)}@1234`);
  };

  return (
    <div className="flex min-h-screen flex-1" style={{ background: "#000" }}>
      {/* Left panel */}
      <div className="relative hidden overflow-hidden lg:flex lg:w-1/2 lg:flex-col lg:justify-between p-12"
        style={{ background: "linear-gradient(145deg,#050e06,#000)", borderRight: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 70% 55% at 20% 45%,rgba(34,197,94,0.12) 0%,transparent 65%)" }} />
        <div className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.03) 1px,transparent 1px)", backgroundSize: "28px 28px" }} />
        <Link href="/" className="relative z-10 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl"
            style={{ background: "linear-gradient(135deg,#22c55e,#16a34a)", boxShadow: "0 0 16px rgba(34,197,94,0.4)" }}>
            <Leaf size={14} className="text-black" />
          </div>
          <span className="text-[15px] font-bold text-white" style={{ fontFamily: "var(--font-jakarta)" }}>
            Urban<span style={{ color: "#22c55e" }}>Bloom</span>
          </span>
        </Link>
        <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="relative z-10 space-y-6">
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#22c55e", fontFamily: "var(--font-dm)" }}>Welcome Back</p>
          <h2 className="text-4xl font-extrabold leading-tight text-white" style={{ fontFamily: "var(--font-jakarta)", letterSpacing: "-1.5px" }}>
            Your farm<br />is waiting<br /><span style={{ color: "#22c55e" }}>for you.</span>
          </h2>
          <p className="max-w-sm text-sm leading-relaxed" style={{ color: "var(--text-2)", fontFamily: "var(--font-dm)" }}>
            Sign back in to manage your plots, track plant health, and access the organic marketplace.
          </p>
          {[["🌱","Real-time plant growth tracking"],["🛒","Certified organic marketplace"],["📊","Vendor analytics dashboard"]].map(([e, t]) => (
            <div key={t} className="flex items-center gap-3">
              <span className="text-base">{e}</span>
              <span className="text-sm" style={{ color: "var(--text-2)", fontFamily: "var(--font-dm)" }}>{t}</span>
            </div>
          ))}
        </motion.div>
        <div className="relative z-10 rounded-2xl border border-white/06 bg-white/02 p-5 backdrop-blur">
          <p className="mb-3 text-sm italic leading-relaxed" style={{ color: "var(--text-2)", fontFamily: "var(--font-dm)" }}>
            "My produce sales doubled in 3 months after joining UrbanBloom."
          </p>
          <div className="flex items-center gap-2.5">
            <img src="https://i.pravatar.cc/32?img=22" alt="" width={28} height={28} className="rounded-lg"
              onError={e => { (e.target as HTMLImageElement).src = "https://placehold.co/28x28/22c55e/000?text=P"; }} />
            <div>
              <p className="text-xs font-semibold text-white">Priya Sharma</p>
              <p className="text-xs" style={{ color: "var(--text-3)" }}>Vendor · Austin, TX</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex flex-1 flex-col items-center justify-center px-5 py-12">
        <div className="mb-8 flex items-center gap-2 lg:hidden">
          <div className="flex h-7 w-7 items-center justify-center rounded-xl" style={{ background: "linear-gradient(135deg,#22c55e,#16a34a)" }}>
            <Leaf size={13} className="text-black" />
          </div>
          <span className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-jakarta)" }}>Urban<span style={{ color: "#22c55e" }}>Bloom</span></span>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }} className="w-full max-w-[420px]">
          <div className="rounded-[28px] p-8"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(20px)", boxShadow: "0 24px 60px rgba(0,0,0,0.6)" }}>
            <div className="mb-7">
              <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-jakarta)" }}>Sign in</h1>
              <p className="mt-1 text-sm" style={{ color: "var(--text-3)", fontFamily: "var(--font-dm)" }}>Enter your credentials to continue.</p>
            </div>
       {/* form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium" style={{ color: "var(--text-3)" }}>Email address</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email"
                  className="input-field" />
              </div>
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label className="text-xs font-medium" style={{ color: "var(--text-3)" }}>Password</label>
                  <Link href="#" className="text-xs transition-colors hover:text-white" style={{ color: "#22c55e" }}>Forgot?</Link>
                </div>
                <div className="relative">
                  <input type={show ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" autoComplete="current-password"
                    className="input-field pr-10" />
                  <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors" style={{ color: "var(--text-3)" }}>
                    {show ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
              <motion.button type="submit" disabled={loading} whileTap={{ scale: 0.97 }}
                className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-black disabled:opacity-60"
                style={{ background: "linear-gradient(135deg,#22c55e,#16a34a)", boxShadow: "0 0 20px rgba(34,197,94,0.25)" }}>
                {loading ? <><Loader2 size={14} className="animate-spin" />Signing in...</> : <>Sign in <ArrowRight size={13} /></>}
              </motion.button>
            </form>

            <div className="my-5 flex items-center gap-3">
              <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.06)" }} />
              <span className="text-xs" style={{ color: "var(--text-4)", fontFamily: "var(--font-dm)" }}>quick demo login</span>
              <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.06)" }} />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {["Admin", "Vendor", "Customer"].map(r => (
                <button key={r} type="button" onClick={() => fillDemo(r)}
                  className="rounded-xl border py-2 text-xs font-medium transition-all hover:border-white/20 hover:text-white"
                  style={{ border: "1px solid rgba(255,255,255,0.08)", color: "var(--text-3)", fontFamily: "var(--font-dm)" }}>
                  {r}
                </button>
              ))}
            </div>
            <p className="mt-1 text-center text-xs" style={{ color: "var(--text-4)" }}>Click to auto-fill demo credentials</p>
          </div>
          <p className="mt-5 text-center text-sm" style={{ color: "var(--text-3)", fontFamily: "var(--font-dm)" }}>
            Don't have an account?{" "}
            <Link href="/signup" className="font-medium transition-colors hover:text-white" style={{ color: "#22c55e" }}>Create one free</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
