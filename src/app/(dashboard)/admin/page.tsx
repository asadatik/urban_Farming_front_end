import { DashboardShell } from "@/components/shared/DashboardShell";
import { AdminDashboard } from "@/components/modules/dashboard/AdminDashboard";
export const metadata = { title: "Admin Dashboard" };
export default function AdminDashboardPage() {
  return (
    <DashboardShell title="Platform Overview" subtitle="Real-time health and moderation queue">
      <AdminDashboard />
    </DashboardShell>
  );
}
