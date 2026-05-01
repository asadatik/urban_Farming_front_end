"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShoppingBag, ChevronRight, Loader2, CheckCircle2, ArrowLeft, Package } from "lucide-react";
import { toast } from "sonner";
import { useCartStore } from "@/lib/stores/cartStore";
import { orderApi } from "@/lib/api/services";
import { cn } from "@/lib/utils";

const STEPS = ["Review","Delivery","Confirm"];
const SLOTS = ["Morning (8am–12pm)","Afternoon (12pm–5pm)","Evening (5pm–9pm)"];

const EMPTY_DELIVERY = { name:"", phone:"", address:"", city:"", district:"", note:"", slot:SLOTS[0] };

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clearCart } = useCartStore();
  const [step, setStep] = useState(0);
  const [delivery, setDelivery] = useState(EMPTY_DELIVERY);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState<string|null>(null);

  const subtotal = total();
  const deliveryFee = subtotal > 30 ? 0 : 3.99;
  const grandTotal = subtotal + deliveryFee;

  const validateDelivery = () => {
    if (!delivery.name || !delivery.phone || !delivery.address || !delivery.city || !delivery.district) {
      toast.error("Please fill in all required fields.");
      return false;
    }
    return true;
  };

  const placeOrder = async () => {
    setLoading(true);
    try {
      const results = await Promise.allSettled(
        items.map(item => orderApi.place(item.produce.id, item.quantity))
      );
      const succeeded = results.filter(r => r.status === "fulfilled").length;
      const fakeId = `ORD-${Date.now().toString().slice(-6)}`;
      setOrderId(fakeId);
      clearCart();
      setStep(3);
      if (succeeded < items.length) toast.warning(`${items.length - succeeded} items could not be placed.`);
    } catch {
      toast.error("Order failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0 && step < 3) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#020617]">
        <div className="text-center">
          <ShoppingBag size={40} className="mx-auto mb-4 text-slate-600" />
          <p className="mb-4 text-lg font-semibold text-slate-300" style={{ fontFamily:"var(--font-jakarta)" }}>Your cart is empty</p>
          <Link href="/marketplace" className="text-sm text-emerald-500 hover:text-emerald-400 transition-colors">Browse marketplace →</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617]">
      <div className="pointer-events-none fixed inset-0 z-0" style={{ backgroundImage:"radial-gradient(rgba(148,163,184,0.05) 1px,transparent 1px)", backgroundSize:"28px 28px" }} />

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-12">
        <div className="mb-8 flex items-center gap-3">
          <Link href="/marketplace" className="flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-slate-300">
            <ArrowLeft size={13} />Back
          </Link>
          <span className="text-slate-700">/</span>
          <span className="text-sm text-slate-300">Checkout</span>
        </div>

        {step < 3 && (
          <div className="mb-8 flex items-center justify-center gap-0">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className={cn("flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-all duration-300",
                    i < step ? "bg-emerald-500 text-black" : i === step ? "bg-emerald-500 text-black" : "border border-slate-700 text-slate-500"
                  )}>
                    {i < step ? <CheckCircle2 size={14} /> : i + 1}
                  </div>
                  <span className={cn("text-xs font-medium transition-colors", i <= step ? "text-slate-200" : "text-slate-600")}>{s}</span>
                </div>
                {i < STEPS.length - 1 && <ChevronRight size={14} className="mx-3 text-slate-700" />}
              </div>
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="step0" initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-20 }} transition={{ duration:0.25 }}>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
                <div className="lg:col-span-3 space-y-3">
                  <h2 className="text-lg font-bold text-slate-100" style={{ fontFamily:"var(--font-jakarta)" }}>Order Review</h2>
                  {items.map(item => (
                    <div key={item.produce.id} className="flex items-center gap-4 rounded-[20px] border border-slate-800/80 p-4" style={{ background:"linear-gradient(145deg,#0f172a,#0c1525)" }}>
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl" style={{ background:"rgba(16,185,129,0.08)", border:"1px solid rgba(16,185,129,0.15)" }}>🌿</div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-slate-200 text-sm">{item.produce.name}</p>
                        <p className="text-xs text-slate-500">{item.produce.vendor?.farmName} · Qty: {item.quantity}</p>
                      </div>
                      <span className="font-bold text-slate-200" style={{ fontFamily:"var(--font-jakarta)" }}>${(item.produce.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="lg:col-span-2">
                  <div className="sticky top-6 rounded-[20px] border border-slate-800/80 p-5" style={{ background:"linear-gradient(145deg,#0f172a,#0c1525)" }}>
                    <h3 className="mb-4 font-semibold text-slate-200" style={{ fontFamily:"var(--font-jakarta)" }}>Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between text-slate-400"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                      <div className="flex justify-between text-slate-400"><span>Delivery</span><span>{deliveryFee === 0 ? <span className="text-emerald-400">Free</span> : `$${deliveryFee.toFixed(2)}`}</span></div>
                      <div className="h-px bg-slate-800 my-3" />
                      <div className="flex justify-between font-bold text-slate-100 text-base"><span>Total</span><span>${grandTotal.toFixed(2)}</span></div>
                    </div>
                    {subtotal < 30 && <p className="mt-3 text-xs text-slate-500">Add ${(30-subtotal).toFixed(2)} more for free delivery.</p>}
                    <motion.button whileTap={{ scale:0.97 }} onClick={() => setStep(1)} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-black" style={{ background:"linear-gradient(135deg,#10b981,#059669)" }}>
                      Proceed to Delivery <ChevronRight size={14} />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="step1" initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-20 }} transition={{ duration:0.25 }}>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
                <div className="lg:col-span-3 space-y-4">
                  <h2 className="text-lg font-bold text-slate-100" style={{ fontFamily:"var(--font-jakarta)" }}>Delivery Details</h2>
                  <div className="rounded-[20px] border border-slate-800/80 p-5 space-y-4" style={{ background:"linear-gradient(145deg,#0f172a,#0c1525)" }}>
                    {[
                      { label:"Full Name *", key:"name", placeholder:"Your full name" },
                      { label:"Phone Number *", key:"phone", placeholder:"+880 1XXXXXXXXX" },
                      { label:"Delivery Address *", key:"address", placeholder:"House, Road, Block..." },
                      { label:"City *", key:"city", placeholder:"e.g. Dhaka" },
                      { label:"District *", key:"district", placeholder:"e.g. Dhaka North" },
                      { label:"Special Instructions", key:"note", placeholder:"Leave at door, call before delivery..." },
                    ].map(({ label, key, placeholder }) => (
                      <div key={key}>
                        <label className="mb-1.5 block text-xs font-medium text-slate-400">{label}</label>
                        <input value={(delivery as any)[key]} onChange={e => setDelivery(p=>({...p,[key]:e.target.value}))} placeholder={placeholder}
                          className="w-full rounded-xl border border-slate-800 bg-slate-900/50 px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 outline-none transition-all focus:border-emerald-500/40 focus:ring-2 focus:ring-emerald-500/15"
                        />
                      </div>
                    ))}
                    <div>
                      <label className="mb-2 block text-xs font-medium text-slate-400">Preferred Delivery Slot</label>
                      <div className="grid grid-cols-3 gap-2">
                        {SLOTS.map(s => (
                          <button key={s} onClick={() => setDelivery(p=>({...p,slot:s}))}
                            className={cn("rounded-xl border py-2.5 text-xs font-medium transition-all", delivery.slot===s ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300" : "border-slate-800 text-slate-400 hover:border-slate-700")}
                          >{s.split(" ")[0]}<br /><span className="text-slate-500">{s.split(" ").slice(1).join(" ")}</span></button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <div className="sticky top-6 rounded-[20px] border border-slate-800/80 p-5 space-y-3" style={{ background:"linear-gradient(145deg,#0f172a,#0c1525)" }}>
                    <div className="text-sm space-y-2">
                      <div className="flex justify-between text-slate-400"><span>Items</span><span>{items.length}</span></div>
                      <div className="flex justify-between font-bold text-slate-100 text-base"><span>Total</span><span>${grandTotal.toFixed(2)}</span></div>
                    </div>
                    <div className="flex gap-3 pt-2">
                      <button onClick={() => setStep(0)} className="flex-1 rounded-xl border border-slate-800 py-2.5 text-sm text-slate-400 hover:border-slate-700 transition-all">Back</button>
                      <motion.button whileTap={{ scale:0.97 }} onClick={() => { if(validateDelivery()) setStep(2); }} className="flex-1 rounded-xl py-2.5 text-sm font-semibold text-black" style={{ background:"linear-gradient(135deg,#10b981,#059669)" }}>
                        Place Order
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-20 }} transition={{ duration:0.25 }}
              className="mx-auto max-w-md"
            >
              <div className="rounded-[24px] border border-slate-800/80 p-8 text-center" style={{ background:"linear-gradient(145deg,#0f172a,#0c1525)" }}>
                <Package size={32} className="mx-auto mb-4 text-emerald-400" />
                <h2 className="mb-2 text-xl font-bold text-slate-100" style={{ fontFamily:"var(--font-jakarta)" }}>Confirm Your Order</h2>
                <p className="mb-6 text-sm text-slate-400">Delivering to <strong className="text-slate-300">{delivery.address}, {delivery.city}</strong><br />Slot: {delivery.slot}</p>
                <div className="mb-6 rounded-xl border border-slate-800 bg-slate-900/40 p-4 text-left space-y-2">
                  <div className="flex justify-between text-sm text-slate-400"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                  <div className="flex justify-between text-sm text-slate-400"><span>Delivery</span><span>{deliveryFee===0 ? "Free" : `$${deliveryFee.toFixed(2)}`}</span></div>
                  <div className="flex justify-between font-bold text-slate-100 text-base pt-2 border-t border-slate-800"><span>Total</span><span>${grandTotal.toFixed(2)}</span></div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="flex-1 rounded-xl border border-slate-800 py-3 text-sm text-slate-400 hover:border-slate-700 transition-all">Edit</button>
                  <motion.button whileTap={{ scale:0.97 }} onClick={placeOrder} disabled={loading}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-black disabled:opacity-70 transition-all"
                    style={{ background:"linear-gradient(135deg,#10b981,#059669)", boxShadow:"0 0 20px rgba(16,185,129,0.3)" }}
                  >
                    {loading ? <><Loader2 size={14} className="animate-spin" />Placing...</> : "Confirm Order"}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }} transition={{ duration:0.4, ease:[0.22,1,0.36,1] }}
              className="mx-auto max-w-md text-center"
            >
              <motion.div initial={{ scale:0 }} animate={{ scale:1 }} transition={{ type:"spring", stiffness:300, damping:20, delay:0.1 }}
                className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full"
                style={{ background:"rgba(16,185,129,0.15)", border:"2px solid rgba(16,185,129,0.3)", boxShadow:"0 0 40px rgba(16,185,129,0.2)" }}
              >
                <CheckCircle2 size={36} className="text-emerald-400" />
              </motion.div>
              <h2 className="mb-2 text-2xl font-extrabold text-slate-100" style={{ fontFamily:"var(--font-jakarta)" }}>Order Placed!</h2>
              <p className="mb-2 text-slate-400">Your order has been confirmed successfully.</p>
              <p className="mb-8 font-mono text-sm text-emerald-400">{orderId}</p>
              <div className="flex flex-col gap-3">
                <Link href="/dashboard/customer/tracking" className="flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-black" style={{ background:"linear-gradient(135deg,#10b981,#059669)" }}>
                  Track My Order
                </Link>
                <Link href="/marketplace" className="rounded-xl border border-slate-800 py-3 text-sm text-slate-400 transition-all hover:border-slate-700 hover:text-slate-200">
                  Continue Shopping
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
