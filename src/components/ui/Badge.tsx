import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "success" | "warning" | "error" | "info" | "pending" | "outline";

const variants: Record<BadgeVariant, string> = {
  default:  "bg-slate-800 text-slate-300 border-slate-700/50",
  success:  "bg-emerald-900/50 text-emerald-300 border-emerald-500/20",
  warning:  "bg-amber-900/50 text-amber-300 border-amber-500/20",
  error:    "bg-red-900/50 text-red-300 border-red-500/20",
  info:     "bg-blue-900/50 text-blue-300 border-blue-500/20",
  pending:  "bg-violet-900/50 text-violet-300 border-violet-500/20",
  outline:  "bg-transparent text-slate-400 border-slate-700",
};

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
