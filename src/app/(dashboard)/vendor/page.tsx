import { DashboardShell } from "@/components/shared/DashboardShell";
import { VendorDashboard } from "@/components/modules/dashboard/VendorDashboard";
export const metadata = { title: "Vendor Dashboard" };
export default function VendorDashboardPage() {
  return (
    <DashboardShell title="Farm Dashboard" subtitle="Your platform performance at a glance">
      <VendorDashboard />
    </DashboardShell>
  );
}
