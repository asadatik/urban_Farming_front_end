"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Leaf, ChevronRight, Loader2, CheckCircle2, Home, Sprout, Building2, Flower2 } from "lucide-react";
import { toast } from "sonner";
import { vendorApi, produceApi } from "@/lib/api/services";
import { cn } from "@/lib/utils";

const STEPS = ["Farm Identity","Location & Space","First Listing"];
const FARM_TYPES = [
  { value:"ROOFTOP",    label:"Rooftop",    icon:Building2, desc:"Elevated urban space" },
  { value:"COMMUNITY",  label:"Community",  icon:Home,      desc:"Shared garden plot" },
  { value:"BALCONY",    label:"Balcony",    icon:Flower2,   desc:"Small balcony space" },
  { value:"GREENHOUSE", label:"Greenhouse", icon:Sprout,    desc:"Controlled environment" },
];

export default function VendorOnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const [identity, setIdentity] = useState({ farmName:"", bio:"", farmType:"ROOFTOP" });
  const [location, setLocation] = useState({ farmLocation:"", hasSpaces:false, spaceCount:"1", spaceSize:"10sqm" });
  const [produce, setProduce] = useState({ name:"", price:"", category:"VEGETABLES", skip:false });

  const pct = Math.round(((step) / STEPS.length) * 100);

  const nextStep = async () => {
    if (step === 0) {
      if (!identity.farmName) { toast.error("Farm name is required."); return; }
      setStep(1);
    } else if (step === 1) {
      if (!location.farmLocation) { toast.error("Farm location is required."); return; }
      setLoading(true);
      try {
        await vendorApi.updateProfile({ farmName:identity.farmName, farmLocation:location.farmLocation, farmDescription:identity.bio });
        setStep(2);
      } catch {
        toast.error("Failed to save profile. Please try again.");
      } finally { setLoading(false); }
    } else if (step === 2) {
      setLoading(true);
      try {
        if (!produce.skip && produce.name && produce.price) {
          await produceApi.create({ name:produce.name, price:parseFloat(produce.price), category:produce.category as any, availableQuantity:0 });
        }
        toast.success(`Welcome to UrbanBloom, ${identity.farmName}! 🌱`);
        router.push("/dashboard/vendor");
      } catch {
        toast.error("Could not create listing, but your farm is ready.");
        router.push("/dashboard/vendor");
      } finally { setLoading(false); }
    }
  };

  return (
    <div className="flex min-h-screen bg-[#020617]">
      {/* Left panel */}
      <div className="relative hidden w-[420px] shrink-0 overflow-hidden lg:flex lg:flex-col lg:justify-between p-12"
        style={{ background:"linear-gradient(145deg,#061018,#020617)", borderRight:"1px solid rgba(30,41,59,0.6)" }}
      >
        <div className="pointer-events-none absolute inset-0" style={{ background:"radial-gradient(ellipse 70% 50% at 20% 40%,rgba(16,185,129,0.12) 0%,transparent 60%)" }} />
        <div className="pointer-events-none absolute inset-0" style={{ backgroundImage:"radial-gradient(rgba(148,163,184,0.05) 1px,transparent 1px)", backgroundSize:"28px 28px" }} />

        <Link href="/" className="relative flex items-center gap-2.5 z-10">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl" style={{ background:"linear-gradient(135deg,#10b981,#059669)", boxShadow:"0 0 16px rgba(16,185,129,0.4)" }}>
            <Leaf size={15} className="text-white" />
          </div>
          <span className="text-base font-bold text-white" style={{ fontFamily:"var(--font-jakarta)" }}>Urban<span className="text-emerald-400">Harvest</span></span>
        </Link>

        <motion.div initial={{ opacity:0, x:-16 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.5, delay:0.2 }} className="relative z-10 space-y-6">
          <p className="text-xs font-medium uppercase tracking-widest text-emerald-500">Getting Started</p>
          <h2 className="text-3xl font-extrabold leading-tight text-slate-100" style={{ fontFamily:"var(--font-jakarta)" }}>
            Set up your<br /><span className="text-emerald-400">urban farm</span><br />in 3 steps.
          </h2>
          <p className="text-sm leading-relaxed text-slate-400">Complete your profile to start listing produce, managing rental spaces, and connecting with buyers across the platform.</p>

          <div className="space-y-3 pt-2">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-3">
                <div className={cn("flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-all duration-300",
                  i < step ? "bg-emerald-500 text-black" : i === step ? "border-2 border-emerald-500 text-emerald-400" : "border border-slate-700 text-slate-600"
                )}>
                  {i < step ? <CheckCircle2 size={13} /> : i + 1}
                </div>
                <span className={cn("text-sm font-medium transition-colors", i <= step ? "text-slate-200" : "text-slate-600")}>{s}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="relative z-10">
          <div className="mb-2 flex justify-between text-xs text-slate-500">
            <span>Profile completion</span><span>{pct}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-slate-800">
            <motion.div animate={{ width:`${pct}%` }} transition={{ duration:0.5 }} className="h-1.5 rounded-full" style={{ background:"linear-gradient(90deg,#10b981,#34d399)" }} />
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-6 flex justify-center gap-2 lg:hidden">
            {STEPS.map((_, i) => (
              <div key={i} className="h-1 rounded-full transition-all duration-300" style={{ width: i === step ? 24 : 8, background: i <= step ? "#10b981" : "#1e293b" }} />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-16 }} transition={{ duration:0.3 }}
              className="rounded-[28px] p-8"
              style={{ background:"rgba(15,23,42,0.7)", border:"1px solid rgba(30,41,59,0.8)", backdropFilter:"blur(20px)", boxShadow:"0 24px 60px rgba(0,0,0,0.5)" }}
            >
              {step === 0 && (
                <div>
                  <h2 className="mb-1 text-xl font-bold text-slate-100" style={{ fontFamily:"var(--font-jakarta)" }}>Tell us about your farm</h2>
                  <p className="mb-6 text-sm text-slate-500">This is how buyers will discover you on the marketplace.</p>
                  <div className="space-y-4">
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-slate-400">Farm Name *</label>
                      <input value={identity.farmName} onChange={e => setIdentity(p=>({...p,farmName:e.target.value}))} placeholder="e.g. Green Valley Organics"
                        className="w-full rounded-xl border border-slate-800 bg-slate-900/50 px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 outline-none focus:border-emerald-500/40 focus:ring-2 focus:ring-emerald-500/15"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-slate-400">Farm Bio <span className="text-slate-600">(optional)</span></label>
                      <textarea value={identity.bio} onChange={e => setIdentity(p=>({...p,bio:e.target.value}))} rows={3} maxLength={300} placeholder="What makes your farm special?"
                        className="w-full rounded-xl border border-slate-800 bg-slate-900/50 px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 outline-none focus:border-emerald-500/40 resize-none"
                      />
                      <p className="mt-1 text-right text-xs text-slate-600">{identity.bio.length}/300</p>
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-medium text-slate-400">Farm Type</label>
                      <div className="grid grid-cols-2 gap-2">
                        {FARM_TYPES.map(({ value, label, icon:Icon, desc }) => (
                          <button key={value} onClick={() => setIdentity(p=>({...p,farmType:value}))}
                            className={cn("flex items-start gap-2.5 rounded-xl border p-3 text-left transition-all duration-200", identity.farmType===value ? "border-emerald-500/40 bg-emerald-500/08" : "border-slate-800 hover:border-slate-700")}
                          >
                            <div className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-lg mt-0.5", identity.farmType===value ? "bg-emerald-500/15" : "bg-slate-800")}>
                              <Icon size={13} className={identity.farmType===value ? "text-emerald-400" : "text-slate-500"} />
                            </div>
                            <div>
                              <p className={cn("text-xs font-semibold", identity.farmType===value ? "text-emerald-300" : "text-slate-300")}>{label}</p>
                              <p className="text-xs text-slate-500">{desc}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div>
                  <h2 className="mb-1 text-xl font-bold text-slate-100" style={{ fontFamily:"var(--font-jakarta)" }}>Location & Spaces</h2>
                  <p className="mb-6 text-sm text-slate-500">Help customers find your farm and available plots.</p>
                  <div className="space-y-4">
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-slate-400">Farm Location *</label>
                      <input value={location.farmLocation} onChange={e => setLocation(p=>({...p,farmLocation:e.target.value}))} placeholder="e.g. Gulshan-2, Dhaka"
                        className="w-full rounded-xl border border-slate-800 bg-slate-900/50 px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 outline-none focus:border-emerald-500/40 focus:ring-2 focus:ring-emerald-500/15"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-medium text-slate-400">Do you have rental spaces available?</label>
                      <div className="flex gap-3">
                        {[true,false].map(v => (
                          <button key={String(v)} onClick={() => setLocation(p=>({...p,hasSpaces:v}))}
                            className={cn("flex-1 rounded-xl border py-2.5 text-sm font-medium transition-all", location.hasSpaces===v ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300" : "border-slate-800 text-slate-400 hover:border-slate-700")}
                          >{v ? "Yes" : "No"}</button>
                        ))}
                      </div>
                    </div>
                    {location.hasSpaces && (
                      <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:"auto" }} className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="mb-1.5 block text-xs font-medium text-slate-400">Number of Spaces</label>
                          <input type="number" min="1" value={location.spaceCount} onChange={e => setLocation(p=>({...p,spaceCount:e.target.value}))}
                            className="w-full rounded-xl border border-slate-800 bg-slate-900/50 px-4 py-2.5 text-sm text-slate-200 outline-none focus:border-emerald-500/40"
                          />
                        </div>
                        <div>
                          <label className="mb-1.5 block text-xs font-medium text-slate-400">Approx. Size</label>
                          <select value={location.spaceSize} onChange={e => setLocation(p=>({...p,spaceSize:e.target.value}))}
                            className="w-full rounded-xl border border-slate-800 bg-slate-900/50 px-4 py-2.5 text-sm text-slate-200 outline-none focus:border-emerald-500/40"
                          >
                            {["5sqm","10sqm","20sqm","50sqm"].map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className="mb-1 text-xl font-bold text-slate-100" style={{ fontFamily:"var(--font-jakarta)" }}>Add your first listing</h2>
                  <p className="mb-6 text-sm text-slate-500">Optional — you can always add produce from your dashboard.</p>
                  {!produce.skip ? (
                    <div className="space-y-4">
                      <div>
                        <label className="mb-1.5 block text-xs font-medium text-slate-400">Product Name</label>
                        <input value={produce.name} onChange={e => setProduce(p=>({...p,name:e.target.value}))} placeholder="e.g. Organic Cherry Tomatoes"
                          className="w-full rounded-xl border border-slate-800 bg-slate-900/50 px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 outline-none focus:border-emerald-500/40"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="mb-1.5 block text-xs font-medium text-slate-400">Price ($)</label>
                          <input type="number" value={produce.price} onChange={e => setProduce(p=>({...p,price:e.target.value}))} placeholder="0.00"
                            className="w-full rounded-xl border border-slate-800 bg-slate-900/50 px-4 py-2.5 text-sm text-slate-200 outline-none focus:border-emerald-500/40"
                          />
                        </div>
                        <div>
                          <label className="mb-1.5 block text-xs font-medium text-slate-400">Category</label>
                          <select value={produce.category} onChange={e => setProduce(p=>({...p,category:e.target.value}))}
                            className="w-full rounded-xl border border-slate-800 bg-slate-900/50 px-4 py-2.5 text-sm text-slate-200 outline-none focus:border-emerald-500/40"
                          >
                            {["VEGETABLES","FRUITS","HERBS","SEEDS","TOOLS","OTHER"].map(c => <option key={c} value={c}>{c}</option>)}
                          </select>
                        </div>
                      </div>
                      <button onClick={() => setProduce(p=>({...p,skip:true}))} className="w-full text-xs text-slate-600 hover:text-slate-400 transition-colors">
                        Skip this step →
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3 py-6 text-center">
                      <CheckCircle2 size={32} className="text-emerald-500/60" />
                      <p className="text-sm text-slate-400">You can add produce listings anytime from your vendor dashboard.</p>
                      <button onClick={() => setProduce(p=>({...p,skip:false}))} className="text-xs text-emerald-500 hover:text-emerald-400 transition-colors">Add one now</button>
                    </div>
                  )}
                </div>
              )}

              <motion.button whileTap={{ scale:0.97 }} onClick={nextStep} disabled={loading}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-black disabled:opacity-70 transition-all"
                style={{ background:"linear-gradient(135deg,#10b981,#059669)", boxShadow:"0 0 20px rgba(16,185,129,0.25)" }}
              >
                {loading ? <><Loader2 size={14} className="animate-spin" />Saving...</> : step < 2 ? <>Continue <ChevronRight size={14} /></> : "Finish Setup →"}
              </motion.button>
            </motion.div>
          </AnimatePresence>

          <p className="mt-4 text-center text-xs text-slate-600">
            You can update all of this later from your{" "}
            <Link href="/dashboard/vendor" className="text-slate-500 hover:text-slate-300 transition-colors">dashboard</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
