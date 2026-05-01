"use client";
import { motion } from "framer-motion";
import { Sidebar } from "@/components/shared/Sidebar";
import { TopNav } from "@/components/shared/TopNav";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/lib/stores/authStore";

interface DashboardShellProps {
  children: React.ReactNode;
  role?: "ADMIN" | "VENDOR" | "CUSTOMER";
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function DashboardShell({ children, role, title, subtitle, actions, className }: DashboardShellProps) {
  const { user } = useAuthStore();
  const resolvedRole = role ?? (user?.role as any) ?? "CUSTOMER";
  const mockUser = { name: user?.name ?? "User", email: user?.email ?? "" };

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#020617" }}>
      <Sidebar role={resolvedRole} user={mockUser} />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <TopNav title={title} subtitle={subtitle} actions={actions} />
        <main className="flex-1 overflow-y-auto">
          <div className="pointer-events-none fixed inset-0 z-0"
            style={{ backgroundImage: "radial-gradient(rgba(148,163,184,0.04) 1px,transparent 1px)", backgroundSize: "28px 28px" }} />
          <div className="pointer-events-none fixed right-0 top-0 z-0 h-96 w-96 rounded-full"
            style={{ background: "radial-gradient(circle at top right,rgba(16,185,129,0.05) 0%,transparent 70%)" }} />
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
            className={cn("relative z-10 p-6", className)}>
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
