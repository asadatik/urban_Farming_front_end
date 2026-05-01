import { DashboardShell } from "@/components/shared/DashboardShell";
import { CustomerDashboard } from "@/components/modules/dashboard/CustomerDashboard";
export const metadata = { title: "Dashboard" };
export default function CustomerDashboardPage() {
  return (
    <DashboardShell title="Good morning 🌱" subtitle="Here's what's growing today">
      <CustomerDashboard />
    </DashboardShell>
  );
}
