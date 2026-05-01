"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Plus, X, Sprout, Loader2, Trash2, RefreshCw } from "lucide-react";
import Navbar from "@/components/sections/Navbar";
import { useMyTrackings, useStartTracking, useUpdateTrackingStatus, useDeleteTracking } from "@/hooks/useApi";
import { useAuthStore } from "@/lib/stores/authStore";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils";

type PlantStatus = "SEEDLING" | "GROWING" | "FLOWERING" | "FRUITING" | "HARVESTING" | "HARVESTED";
const STAGES: PlantStatus[] = ["SEEDLING", "GROWING", "FLOWERING", "FRUITING", "HARVESTING", "HARVESTED"];
const STAGE_COLORS: Record<PlantStatus, string> = {
  SEEDLING: "#3b82f6", GROWING: "#22c55e", FLOWERING: "#f59e0b",
  FRUITING: "#f97316", HARVESTING: "#8b5cf6", HARVESTED: "#6ee7b7",
};
const STAGE_EMOJI: Record<PlantStatus, string> = {
  SEEDLING: "🌱", GROWING: "🌿", FLOWERING: "🌸", FRUITING: "🍅", HARVESTING: "✂️", HARVESTED: "🎉",
};

function AddPlantModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ plantName: "", rentalSpaceId: "", healthNotes: "", plantedDate: "" });
  const { mutateAsync, isPending } = useStartTracking();
  const submit = async () => {
    if (!form.plantName.trim() || !form.rentalSpaceId.trim()) {
      toast.error("Plant name and space ID are required."); return;
    }
    try {
      await mutateAsync({ ...form, plantedDate: form.plantedDate || undefined });
      toast.success("Plant tracking started! 🌱");
      onClose();
    } catch { toast.error("Failed to start tracking."); }
  };
  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <motion.div initial={{ opacity: 0, scale: 0.96, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }}
        className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-[28px] p-7"
        style={{ background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 32px 80px rgba(0,0,0,0.7)" }}>
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white" style={{ fontFamily: "var(--font-jakarta)" }}>Track New Plant</h3>
          <button onClick={onClose} className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 text-zinc-500 hover:text-white"><X size={13} /></button>
        </div>
        <div className="space-y-4">
          {[
            { label: "Plant Name *", key: "plantName", placeholder: "e.g. Cherry Tomatoes" },
            { label: "Rental Space ID *", key: "rentalSpaceId", placeholder: "From your rented space" },
            { label: "Health Notes", key: "healthNotes", placeholder: "Initial observations..." },
          ].map(({ label, key, placeholder }) => (
            <div key={key}>
              <label className="mb-1.5 block text-xs font-medium text-zinc-500">{label}</label>
              <input value={(form as any)[key]} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))} placeholder={placeholder} className="input-field" />
            </div>
          ))}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-zinc-500">Planted Date</label>
            <input type="date" value={form.plantedDate} onChange={e => setForm(p => ({ ...p, plantedDate: e.target.value }))} className="input-field" style={{ colorScheme: "dark" }} />
          </div>
        </div>
        <motion.button whileTap={{ scale: 0.97 }} onClick={submit} disabled={isPending}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-black disabled:opacity-70"
          style={{ background: "linear-gradient(135deg,#22c55e,#16a34a)" }}>
          {isPending ? <><Loader2 size={14} className="animate-spin" />Starting...</> : "Start Tracking"}
        </motion.button>
      </motion.div>
    </>
  );
}

function UpdateStatusModal({ id, current, onClose }: { id: string; current: PlantStatus; onClose: () => void }) {
  const [status, setStatus] = useState<PlantStatus>(current);
  const [notes, setNotes] = useState("");
  const { mutateAsync, isPending } = useUpdateTrackingStatus();
  const submit = async () => {
    try {
      await mutateAsync({ id, status, healthNotes: notes || undefined });
      toast.success(`Status updated to ${status}!`);
      onClose();
    } catch { toast.error("Update failed."); }
  };
  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <motion.div initial={{ opacity: 0, scale: 0.96, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }}
        className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-[28px] p-6"
        style={{ background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 32px 80px rgba(0,0,0,0.7)" }}>
        <div className="mb-5 flex items-center justify-between">
          <h3 className="font-bold text-white" style={{ fontFamily: "var(--font-jakarta)" }}>Update Growth Stage</h3>
          <button onClick={onClose} className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 text-zinc-500 hover:text-white"><X size={13} /></button>
        </div>
        <div className="mb-4 grid grid-cols-2 gap-2">
          {STAGES.filter(s => s !== "SEEDLING").map(s => (
            <button key={s} onClick={() => setStatus(s)}
              className={cn("flex items-center gap-2 rounded-xl border p-2.5 text-left text-xs font-semibold transition-all", status === s ? "text-black" : "border-white/08 text-zinc-500 hover:border-white/16")}
              style={status === s ? { background: STAGE_COLORS[s], borderColor: STAGE_COLORS[s] } : {}}>
              <span>{STAGE_EMOJI[s]}</span>{s}
            </button>
          ))}
        </div>
        <input value={notes} onChange={e => setNotes(e.target.value)} placeholder="Health notes (optional)..." className="input-field mb-4" />
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 rounded-xl border border-white/10 py-2.5 text-sm text-zinc-500 hover:text-white transition-colors">Cancel</button>
          <motion.button whileTap={{ scale: 0.97 }} onClick={submit} disabled={isPending}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold text-black disabled:opacity-70"
            style={{ background: STAGE_COLORS[status] }}>
            {isPending ? <Loader2 size={13} className="animate-spin" /> : "Update"}
          </motion.button>
        </div>
      </motion.div>
    </>
  );
}

function PlantCard({ plant, index }: { plant: any; index: number }) {
  const [updating, setUpdating] = useState(false);
  const { mutate: remove } = useDeleteTracking();
  const stageIdx = STAGES.indexOf(plant.status as PlantStatus);
  const color = STAGE_COLORS[plant.status as PlantStatus] ?? "#22c55e";

  const handleDelete = () => {
    remove(plant.id, {
      onSuccess: () => toast.success("Tracking removed."),
      onError: () => toast.error("Could not remove."),
    });
  };

  return (
    <>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.07 }}
        className="group relative overflow-hidden rounded-[24px] border p-6 transition-all duration-300"
        style={{ background: "linear-gradient(145deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))", borderColor: "rgba(255,255,255,0.06)", boxShadow: `0 0 30px ${color}0a` }}
        onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = `${color}30`}
        onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.06)"}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg,transparent,${color}30,transparent)` }} />

        <div className="mb-5 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl text-2xl"
              style={{ background: `${color}15`, border: `1px solid ${color}25` }}>
              {STAGE_EMOJI[plant.status as PlantStatus] ?? "🌱"}
            </div>
            <div>
              <h3 className="font-bold text-white" style={{ fontFamily: "var(--font-jakarta)", fontSize: 15 }}>{plant.plantName}</h3>
              <p className="text-xs text-zinc-600">{plant.rentalSpace?.location ?? plant.rentalSpaceId}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="rounded-full border px-2.5 py-0.5 text-xs font-semibold"
              style={{ borderColor: `${color}30`, background: `${color}12`, color }}>
              {plant.status}
            </span>
            <button onClick={handleDelete} className="opacity-0 group-hover:opacity-100 flex h-7 w-7 items-center justify-center rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all">
              <Trash2 size={11} />
            </button>
          </div>
        </div>

        {/* Stage timeline */}
        <div className="mb-5 relative">
          <div className="absolute top-[9px] left-0 right-0 h-px bg-white/06" />
          <div className="absolute top-[9px] left-0 h-px transition-all duration-700"
            style={{ width: `${(stageIdx / (STAGES.length - 1)) * 100}%`, background: `linear-gradient(90deg,${color},${color}60)` }} />
          <div className="relative flex justify-between">
            {STAGES.map((stage, si) => (
              <div key={stage} className="flex flex-col items-center gap-2">
                <div className="relative z-10 h-[18px] w-[18px] rounded-full border-2 flex items-center justify-center transition-all"
                  style={{ borderColor: si <= stageIdx ? color : "rgba(255,255,255,0.1)", background: si < stageIdx ? color : si === stageIdx ? `${color}25` : "rgba(0,0,0,0.5)" }}>
                  {si < stageIdx && <div className="h-1.5 w-1.5 rounded-full bg-black" />}
                  {si === stageIdx && <motion.div animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="h-2 w-2 rounded-full" style={{ background: color }} />}
                </div>
                <span className="text-[9px] uppercase tracking-wide" style={{ color: si <= stageIdx ? color : "rgba(255,255,255,0.15)" }}>{stage.slice(0, 4)}</span>
              </div>
            ))}
          </div>
        </div>

        {plant.healthNotes && (
          <p className="mb-4 rounded-xl border border-white/04 bg-white/02 px-3 py-2.5 text-xs leading-relaxed text-zinc-500">{plant.healthNotes}</p>
        )}

        <div className="flex items-center justify-between">
          <span className="text-xs text-zinc-700">Planted: {formatDate(plant.plantedDate)}</span>
          {plant.status !== "HARVESTED" && (
            <motion.button whileTap={{ scale: 0.97 }} onClick={() => setUpdating(true)}
              className="flex items-center gap-1.5 rounded-xl border border-white/10 px-3 py-1.5 text-xs font-medium text-zinc-400 transition-all hover:border-white/20 hover:text-white">
              <RefreshCw size={11} />Update Stage
            </motion.button>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {updating && <UpdateStatusModal id={plant.id} current={plant.status as PlantStatus} onClose={() => setUpdating(false)} />}
      </AnimatePresence>
    </>
  );
}

export default function TrackPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [showAdd, setShowAdd] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const { data: plants, isLoading, refetch } = useMyTrackings();

  if (!isAuthenticated) {
    return (
      <div style={{ background: "#000", minHeight: "100vh" }}>
        <Navbar />
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full" style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.15)" }}>
              <Sprout size={30} style={{ color: "#22c55e" }} />
            </div>
            <h2 className="mb-3 text-2xl font-bold text-white" style={{ fontFamily: "var(--font-jakarta)" }}>Sign in to track plants</h2>
            <p className="mb-6 text-zinc-500">Monitor your plant growth, health, and harvest timelines.</p>
            <a href="/login" className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-black" style={{ background: "#22c55e" }}>Get Started</a>
          </div>
        </div>
      </div>
    );
  }

  const filtered = statusFilter ? (plants ?? []).filter(p => p.status === statusFilter) : (plants ?? []);

  return (
    <div style={{ background: "#000", minHeight: "100vh" }}>
      <Navbar />
      <div className="pointer-events-none fixed inset-0 z-0" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.025) 1px,transparent 1px)", backgroundSize: "32px 32px" }} />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-28 md:px-8 lg:px-10">
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest" style={{ color: "#22c55e", fontFamily: "var(--font-dm)" }}>Plant Tracking</p>
            <h1 className="text-3xl font-extrabold text-white md:text-4xl" style={{ fontFamily: "var(--font-jakarta)", letterSpacing: "-1.5px" }}>
              My Garden Dashboard
            </h1>
            <p className="mt-1 text-sm text-zinc-600" style={{ fontFamily: "var(--font-dm)" }}>
              {(plants ?? []).length} plant{(plants ?? []).length !== 1 ? "s" : ""} tracked
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => refetch()} className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-zinc-500 transition-all hover:border-white/20 hover:text-white">
              <RefreshCw size={13} />
            </button>
            <motion.button whileTap={{ scale: 0.97 }} onClick={() => setShowAdd(true)}
              className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold text-black"
              style={{ background: "linear-gradient(135deg,#22c55e,#16a34a)", boxShadow: "0 0 16px rgba(34,197,94,0.25)" }}>
              <Plus size={14} />Track Plant
            </motion.button>
          </div>
        </div>

        {/* Stage filter */}
        <div className="mb-6 flex flex-wrap gap-2">
          {["", ...STAGES].map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={cn("flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-medium transition-all", statusFilter === s ? "text-black" : "border-white/08 text-zinc-600 hover:border-white/14 hover:text-zinc-400")}
              style={statusFilter === s ? { background: s ? STAGE_COLORS[s as PlantStatus] : "#22c55e", borderColor: s ? STAGE_COLORS[s as PlantStatus] : "#22c55e" } : {}}>
              {s ? <><span>{STAGE_EMOJI[s as PlantStatus]}</span>{s}</> : "All Plants"}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="h-64 rounded-[24px] border border-white/06" style={{ background: "rgba(255,255,255,0.02)", animation: "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite" }} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 rounded-[28px] border border-white/06 py-24 text-center" style={{ background: "rgba(255,255,255,0.02)" }}>
            <div className="flex h-16 w-16 items-center justify-center rounded-full text-3xl" style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.12)" }}>🌱</div>
            <p className="text-lg font-semibold text-zinc-400" style={{ fontFamily: "var(--font-jakarta)" }}>{statusFilter ? `No ${statusFilter} plants` : "No plants tracked yet"}</p>
            <p className="text-sm text-zinc-700">Rent a garden space and start tracking your first plant.</p>
            <button onClick={() => setShowAdd(true)} className="mt-2 rounded-xl px-5 py-2.5 text-sm font-bold text-black" style={{ background: "#22c55e" }}>Track First Plant</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p, i) => <PlantCard key={p.id} plant={p} index={i} />)}
          </div>
        )}
      </div>

      <AnimatePresence>{showAdd && <AddPlantModal onClose={() => setShowAdd(false)} />}</AnimatePresence>
    </div>
  );
}
