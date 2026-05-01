"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Sprout, ShoppingBag, MapPin, Store, MessageSquare,
  Leaf, Warehouse, Package, BarChart3, BadgeCheck, ShieldCheck,
  ClipboardList, LineChart, Users, ChevronLeft, ChevronRight,
  Settings, LogOut, Bell, HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CUSTOMER_NAV, VENDOR_NAV, ADMIN_NAV } from "@/config/navigation";

const ICON_MAP: Record<string, React.ElementType> = {
  LayoutDashboard, Sprout, ShoppingBag, MapPin, Store, MessageSquare,
  Leaf, Warehouse, Package, BarChart3, BadgeCheck, ShieldCheck,
  ClipboardList, LineChart, Users,
};

type Role = "ADMIN" | "VENDOR" | "CUSTOMER";

const NAV_MAP: Record<Role, typeof CUSTOMER_NAV> = {
  CUSTOMER: CUSTOMER_NAV,
  VENDOR:   VENDOR_NAV,
  ADMIN:    ADMIN_NAV,
};

const ROLE_META: Record<Role, { label: string; color: string; bg: string }> = {
  CUSTOMER: { label: "Customer",  color: "text-blue-400",    bg: "bg-blue-500/10" },
  VENDOR:   { label: "Farmer",    color: "text-emerald-400", bg: "bg-emerald-500/10" },
  ADMIN:    { label: "Admin",     color: "text-violet-400",  bg: "bg-violet-500/10" },
};

interface SidebarProps {
  role?: Role;
  user?: { name: string; email: string; avatar?: string };
}

export function Sidebar({ role = "CUSTOMER", user }: SidebarProps) {
  const pathname  = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mounted,   setMounted]   = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const navItems = NAV_MAP[role];
  const roleMeta = ROLE_META[role];

  const sidebarVariants = {
    expanded:  { width: 260 },
    collapsed: { width: 72  },
  };

  if (!mounted) return null;

  return (
    <motion.aside
      variants={sidebarVariants}
      animate={collapsed ? "collapsed" : "expanded"}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="relative flex h-screen flex-col overflow-hidden"
      style={{
        background: "linear-gradient(180deg, rgba(15,23,42,0.97) 0%, rgba(10,22,40,0.99) 100%)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        borderRight: "1px solid rgba(30,41,59,0.8)",
        boxShadow: "1px 0 0 0 rgba(255,255,255,0.03), 4px 0 24px rgba(0,0,0,0.4)",
      }}
    >
      {/* Ambient glow top */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)" }}
      />

      {/* Logo / Brand */}
      <div className="flex h-16 shrink-0 items-center justify-between px-4">
        <AnimatePresence mode="wait">
          {!collapsed ? (
            <motion.div
              key="full-logo"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2.5"
            >
              <LogoMark />
              <span
                className="text-base font-bold tracking-tight text-white"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Urban<span className="text-emerald-400">Harvest</span>
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="icon-logo"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="mx-auto"
            >
              <LogoMark />
            </motion.div>
          )}
        </AnimatePresence>

        {!collapsed && (
          <button
            onClick={() => setCollapsed(true)}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-500 transition-all duration-200 hover:bg-slate-800 hover:text-slate-300"
          >
            <ChevronLeft size={14} />
          </button>
        )}
      </div>

      {/* Collapse button when minimised */}
      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          className="mx-auto mb-2 flex h-7 w-7 items-center justify-center rounded-lg text-slate-500 transition-all duration-200 hover:bg-slate-800 hover:text-slate-300"
        >
          <ChevronRight size={14} />
        </button>
      )}

      {/* User profile capsule */}
      <div className="px-3 pb-3">
        <div
          className={cn(
            "flex items-center gap-3 rounded-xl p-2.5 transition-all duration-200",
            "border border-slate-800/60 bg-slate-900/60 hover:border-slate-700/60",
            collapsed && "justify-center px-0"
          )}
        >
          <div className="relative shrink-0">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-white"
              style={{ background: "linear-gradient(135deg, #10b981 0%, #059669 100%)" }}
            >
              {(user?.name ?? "U")[0].toUpperCase()}
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-slate-900 bg-emerald-500" />
          </div>

          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="min-w-0 flex-1 overflow-hidden"
              >
                <p className="truncate text-xs font-semibold text-slate-200">
                  {user?.name ?? "Demo User"}
                </p>
                <span className={cn("inline-flex items-center rounded-md px-1.5 py-0 text-2xs font-medium", roleMeta.bg, roleMeta.color)}>
                  {roleMeta.label}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-3 mb-3 h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />

      {/* Navigation */}
      <nav className="sidebar-scroll flex-1 px-3">
        <div className="space-y-0.5">
          {navItems.map((item, i) => {
            const Icon    = ICON_MAP[item.icon] ?? LayoutDashboard;
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04, duration: 0.25 }}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                    collapsed && "justify-center px-0",
                    isActive
                      ? "text-emerald-300"
                      : "text-slate-400 hover:text-slate-200"
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  {/* Active background */}
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active-pill"
                      className="absolute inset-0 rounded-xl"
                      style={{
                        background: "linear-gradient(135deg, rgba(16,185,129,0.15) 0%, rgba(6,78,59,0.1) 100%)",
                        border: "1px solid rgba(16,185,129,0.2)",
                        boxShadow: "inset 0 1px 0 rgba(52,211,153,0.1)",
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}

                  {/* Hover glow */}
                  {!isActive && (
                    <span className="absolute inset-0 rounded-xl bg-slate-800/0 transition-all duration-200 group-hover:bg-slate-800/50" />
                  )}

                  <span className="relative z-10 shrink-0">
                    <Icon
                      size={16}
                      className={cn(
                        "transition-all duration-200",
                        isActive
                          ? "text-emerald-400 drop-shadow-[0_0_6px_rgba(16,185,129,0.6)]"
                          : "text-slate-500 group-hover:text-slate-300"
                      )}
                    />
                  </span>

                  <AnimatePresence>
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                        className="relative z-10 overflow-hidden whitespace-nowrap"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* Active indicator dot */}
                  {isActive && !collapsed && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="relative z-10 ml-auto h-1.5 w-1.5 rounded-full bg-emerald-400"
                      style={{ boxShadow: "0 0 6px rgba(52,211,153,0.8)" }}
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </nav>

      {/* Bottom actions */}
      <div className="shrink-0 px-3 pb-4">
        <div className="mx-0 mb-3 h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
        <div className="space-y-0.5">
          {[
            { icon: Bell,        label: "Notifications", badge: 3 },
            { icon: Settings,    label: "Settings" },
            { icon: HelpCircle,  label: "Help & Support" },
          ].map(({ icon: Icon, label, badge }) => (
            <button
              key={label}
              className={cn(
                "group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium",
                "text-slate-500 transition-all duration-200 hover:bg-slate-800/50 hover:text-slate-300",
                collapsed && "justify-center px-0"
              )}
              title={collapsed ? label : undefined}
            >
              <span className="relative shrink-0">
                <Icon size={16} />
                {badge && (
                  <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500 text-2xs font-bold text-white">
                    {badge}
                  </span>
                )}
              </span>
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden whitespace-nowrap"
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          ))}

          <button
            className={cn(
              "group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium",
              "text-red-500/70 transition-all duration-200 hover:bg-red-500/10 hover:text-red-400",
              collapsed && "justify-center px-0"
            )}
            title={collapsed ? "Sign Out" : undefined}
          >
            <LogOut size={16} className="shrink-0" />
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden whitespace-nowrap"
                >
                  Sign Out
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </motion.aside>
  );
}

function LogoMark() {
  return (
    <div
      className="flex h-7 w-7 items-center justify-center rounded-lg"
      style={{
        background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
        boxShadow: "0 0 12px rgba(16,185,129,0.4)",
      }}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M7 1C4 1 1 3.5 1 7c0 2.5 1.5 4.5 3.5 5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M7 1c3 0 6 2.5 6 6 0 2.5-1.5 4.5-3.5 5.5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="7" cy="7" r="2" fill="white" />
        <path d="M7 5V2M7 9v3" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </div>
  );
}
