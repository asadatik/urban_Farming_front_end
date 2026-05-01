import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount);
}

export function formatNumber(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}

export function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function getStatusColor(status: string) {
  const map: Record<string, string> = {
    ACTIVE: "pill-success",
    APPROVED: "pill-success",
    DELIVERED: "pill-success",
    HARVESTED: "pill-success",
    PENDING: "pill-pending",
    GROWING: "pill-info",
    SEEDLING: "pill-info",
    SHIPPED: "pill-info",
    WARNING: "pill-warning",
    FLOWERING: "pill-warning",
    SUSPENDED: "pill-error",
    REJECTED: "pill-error",
    CANCELLED: "pill-error",
    INACTIVE: "pill-neutral",
  };
  return map[status] ?? "pill-neutral";
}
