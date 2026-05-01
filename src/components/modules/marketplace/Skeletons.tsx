"use client";
import { motion } from "framer-motion";

function Pulse({ className }: { className: string }) {
  return (
    <div
      className={className}
      style={{
        background: "linear-gradient(90deg,#1e293b 0%,#273548 50%,#1e293b 100%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.8s linear infinite",
        borderRadius: 8,
      }}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div
      className="overflow-hidden rounded-[24px]"
      style={{ border: "1px solid rgba(30,41,59,0.8)", background: "linear-gradient(145deg,#0f172a,#0c1525)" }}
    >
      <Pulse className="h-[200px] w-full" style={{ borderRadius: 0 } as any} />
      <div className="p-4 space-y-3">
        <div className="flex justify-between gap-4">
          <Pulse className="h-4 w-3/5" />
          <Pulse className="h-4 w-12" />
        </div>
        <Pulse className="h-3 w-full" />
        <Pulse className="h-3 w-4/5" />
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <Pulse className="h-5 w-5 rounded-md" />
            <Pulse className="h-3 w-24" />
          </div>
          <Pulse className="h-3 w-16" />
        </div>
        <Pulse className="h-0.5 w-full mt-1" />
      </div>
      <style>{`@keyframes shimmer{from{background-position:200% center}to{background-position:-200% center}}`}</style>
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="flex gap-10">
      <div className="flex-1 space-y-4">
        <Pulse className="aspect-square w-full rounded-[24px]" />
        <div className="grid grid-cols-4 gap-2">
          {[...Array(4)].map((_, i) => <Pulse key={i} className="aspect-square w-full rounded-xl" />)}
        </div>
      </div>
      <div className="flex-1 space-y-4 pt-2">
        <Pulse className="h-8 w-3/4" />
        <Pulse className="h-6 w-24" />
        <Pulse className="h-4 w-full" />
        <Pulse className="h-4 w-5/6" />
        <Pulse className="h-4 w-4/6" />
        <div className="pt-4 space-y-2">
          <Pulse className="h-12 w-full rounded-2xl" />
          <Pulse className="h-10 w-full rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
