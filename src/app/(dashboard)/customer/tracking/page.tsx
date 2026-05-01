"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DashboardShell } from "@/components/shared/DashboardShell";
import { BentoCard } from "@/components/shared/BentoCard";
import { Plus, X, Sprout, Leaf } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type PlantStatus = "SEEDLING"|"GROWING"|"FLOWERING"|"FRUITING"|"HARVESTING"|"HARVESTED";

const STAGES: PlantStatus[] = ["SEEDLING","GROWING","FLOWERING","FRUITING","HARVESTING","HARVESTED"];
const STAGE_COLORS: Record<PlantStatus,string> = {
  SEEDLING:"#3b82f6", GROWING:"#10b981", FLOWERING:"#f59e0b",
  FRUITING:"#f97316", HARVESTING:"#8b5cf6", HARVESTED:"#6ee7b7",
};

const MOCK_SPACES = ["Plot A-3 · Gulshan","Plot B-1 · Dhanmondi","Rooftop C · Mirpur"];

const MOCK_PLANTS = [
  { id:"t1", plantName:"Organic Tomatoes", rentalSpace:"Plot A-3 · Gulshan", status:"FLOWERING" as PlantStatus, healthNotes:"Looking very healthy. Flowers emerging on all branches.", plantedDate:"Apr 1 2025", days:25 },
  { id:"t2", plantName:"Basil Cluster",    rentalSpace:"Plot B-1 · Dhanmondi",status:"GROWING"   as PlantStatus, healthNotes:"Strong stem growth. Watering twice daily.", plantedDate:"Apr 10 2025", days:16 },
  { id:"t3", plantName:"Cherry Peppers",   rentalSpace:"Rooftop C · Mirpur",  status:"SEEDLING"  as PlantStatus, healthNotes:"Just sprouted. Need more direct sunlight.", plantedDate:"Apr 20 2025", days:6 },
];

const EMPTY = { plantName:"", rentalSpace:MOCK_SPACES[0], healthNotes:"", plantedDate:"" };

export default function CustomerTrackingPage() {
  const [plants, setPlants] = useState(MOCK_PLANTS);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [updating, setUpdating] = useState<string|null>(null);

  const addPlant = () => {
    if (!form.plantName) { toast.error("Plant name is required."); return; }
    setPlants(prev => [{
      id:`t${Date.now()}`, plantName:form.plantName, rentalSpace:form.rentalSpace,
      status:"SEEDLING", healthNotes:form.healthNotes, plantedDate:form.plantedDate || new Date().toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}), days:0,
    }, ...prev]);
    setShowAdd(false); setForm(EMPTY);
    toast.success("Plant tracking started!");
  };

  const updateStatus = (id: string, status: PlantStatus, notes: string) => {
    setPlants(prev => prev.map(p => p.id === id ? { ...p, status, healthNotes:notes || p.healthNotes } : p));
    setUpdating(null);
    toast.success(`Status updated to ${status}.`);
  };

  return (
    <DashboardShell role="CUSTOMER" title="My Plants" subtitle="Track growth, health, and harvest timelines">
      <div className="space-y-4">
        <div className="flex justify-end">
          <motion.button whileTap={{ scale:0.97 }} onClick={() => setShowAdd(true)}
            className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-black"
            style={{ background:"linear-gradient(135deg,#10b981,#059669)", boxShadow:"0 0 16px rgba(16,185,129,0.25)" }}
          >
            <Plus size={14} />Track New Plant
          </motion.button>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {plants.map((plant, i) => {
            const stageIdx = STAGES.indexOf(plant.status);
            const color = STAGE_COLORS[plant.status];
            return (
              <motion.div key={plant.id} initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.08 }}
                className="relative overflow-hidden rounded-[20px] border border-slate-800/80 p-5"
                style={{ background:"linear-gradient(145deg,#0f172a,#0c1525)", boxShadow:`0 0 20px ${color}12` }}
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background:`linear-gradient(90deg,transparent,${color}30,transparent)` }} />

                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ background:`${color}18`, border:`1px solid ${color}25` }}>
                        <Sprout size={13} style={{ color }} />
                      </div>
                      <h3 className="font-semibold text-slate-100" style={{ fontFamily:"var(--font-jakarta)", fontSize:14 }}>{plant.plantName}</h3>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">{plant.rentalSpace} · {plant.days} days old</p>
                  </div>
                  <span className="pill text-2xs" style={{ background:`${color}18`, border:`1px solid ${color}25`, color }}>{plant.status}</span>
                </div>

                <div className="mb-4">
                  <div className="relative">
                    <div className="absolute top-2.5 left-0 right-0 h-px bg-slate-800" />
                    <div className="absolute top-2.5 left-0 h-px transition-all duration-700"
                      style={{ width:`${(stageIdx / (STAGES.length-1)) * 100}%`, background:`linear-gradient(90deg,${color},${color}80)` }}
                    />
                    <div className="relative flex justify-between">
                      {STAGES.map((stage, si) => (
                        <div key={stage} className="flex flex-col items-center gap-1.5">
                          <div className="relative z-10 h-5 w-5 rounded-full border-2 transition-all duration-300 flex items-center justify-center"
                            style={{
                              borderColor: si <= stageIdx ? color : "#1e293b",
                              background: si < stageIdx ? color : si === stageIdx ? `${color}30` : "#0f172a",
                            }}
                          >
                            {si < stageIdx && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                            {si === stageIdx && <motion.div animate={{ scale:[1,1.3,1] }} transition={{ duration:1.5, repeat:Infinity }} className="h-2 w-2 rounded-full" style={{ background:color }} />}
                          </div>
                          <span className="text-2xs" style={{ color: si <= stageIdx ? color : "#475569", fontSize:"0.55rem" }}>{stage.slice(0,4)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {plant.healthNotes && (
                  <p className="mb-4 rounded-xl border border-slate-800/60 bg-slate-900/40 px-3 py-2 text-xs leading-relaxed text-slate-400">{plant.healthNotes}</p>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-600">Planted: {plant.plantedDate}</span>
                  {plant.status !== "HARVESTED" && (
                    <button onClick={() => setUpdating(plant.id)}
                      className="rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-1.5 text-xs font-medium text-slate-400 transition-all hover:border-slate-700 hover:text-slate-200"
                    >Update Status</button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {showAdd && <Modal title="Track New Plant" onClose={() => setShowAdd(false)}>
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-400">Plant Name</label>
              <input value={form.plantName} onChange={e => setForm(p=>({...p,plantName:e.target.value}))} placeholder="e.g. Cherry Tomatoes"
                className="input-row" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-400">Rental Space</label>
              <select value={form.rentalSpace} onChange={e => setForm(p=>({...p,rentalSpace:e.target.value}))} className="input-row">
                {MOCK_SPACES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-400">Planted Date</label>
              <input type="date" value={form.plantedDate} onChange={e => setForm(p=>({...p,plantedDate:e.target.value}))} className="input-row" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-400">Health Notes (optional)</label>
              <textarea value={form.healthNotes} onChange={e => setForm(p=>({...p,healthNotes:e.target.value}))} rows={2} placeholder="Initial observations..." className="input-row resize-none" />
            </div>
          </div>
          <div className="mt-5 flex gap-3">
            <button onClick={() => setShowAdd(false)} className="flex-1 rounded-xl border border-slate-800 py-2.5 text-sm text-slate-400 hover:border-slate-700 transition-all">Cancel</button>
            <motion.button whileTap={{ scale:0.97 }} onClick={addPlant} className="flex-1 rounded-xl py-2.5 text-sm font-semibold text-black" style={{ background:"linear-gradient(135deg,#10b981,#059669)" }}>Start Tracking</motion.button>
          </div>
        </Modal>}

        {updating && <StatusModal
          currentStatus={plants.find(p=>p.id===updating)!.status}
          onClose={() => setUpdating(null)}
          onSave={(status, notes) => updateStatus(updating, status, notes)}
        />}
      </AnimatePresence>

      <style>{`.input-row{width:100%;border-radius:12px;border:1px solid #1e293b;background:rgba(15,23,42,0.5);padding:10px 16px;font-size:13px;color:#e2e8f0;outline:none}.input-row:focus{border-color:rgba(16,185,129,0.4)}`}</style>
    </DashboardShell>
  );
}

function Modal({ title, children, onClose }: { title:string; children:React.ReactNode; onClose:()=>void }) {
  return (
    <>
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} onClick={onClose} className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
      <motion.div initial={{ opacity:0, scale:0.95, y:8 }} animate={{ opacity:1, scale:1, y:0 }} exit={{ opacity:0, scale:0.95 }}
        className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-[24px] p-6"
        style={{ background:"#0f172a", border:"1px solid rgba(30,41,59,0.8)", boxShadow:"0 24px 60px rgba(0,0,0,0.5)" }}
      >
        <div className="mb-5 flex items-center justify-between">
          <h3 className="font-semibold text-slate-100" style={{ fontFamily:"var(--font-jakarta)" }}>{title}</h3>
          <button onClick={onClose} className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-800 text-slate-500 hover:text-slate-300"><X size={13} /></button>
        </div>
        {children}
      </motion.div>
    </>
  );
}

function StatusModal({ currentStatus, onClose, onSave }: { currentStatus:PlantStatus; onClose:()=>void; onSave:(s:PlantStatus,n:string)=>void }) {
  const [status, setStatus] = useState<PlantStatus>(currentStatus);
  const [notes, setNotes] = useState("");
  return (
    <Modal title="Update Plant Status" onClose={onClose}>
      <div className="mb-4 grid grid-cols-2 gap-2">
        {(["GROWING","FLOWERING","FRUITING","HARVESTING","HARVESTED"] as PlantStatus[]).map(s => (
          <button key={s} onClick={() => setStatus(s)}
            className={cn("rounded-xl border py-2.5 text-xs font-semibold transition-all", status===s ? "text-black" : "border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200")}
            style={status===s ? { background:STAGE_COLORS[s], borderColor:STAGE_COLORS[s] } : {}}
          >{s}</button>
        ))}
      </div>
      <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={2} placeholder="Health notes (optional)..." className="input-row resize-none w-full" />
      <div className="mt-4 flex gap-3">
        <button onClick={onClose} className="flex-1 rounded-xl border border-slate-800 py-2.5 text-sm text-slate-400 hover:border-slate-700 transition-all">Cancel</button>
        <motion.button whileTap={{ scale:0.97 }} onClick={() => onSave(status, notes)} className="flex-1 rounded-xl py-2.5 text-sm font-semibold text-black" style={{ background:"linear-gradient(135deg,#10b981,#059669)" }}>Save</motion.button>
      </div>
    </Modal>
  );
}
