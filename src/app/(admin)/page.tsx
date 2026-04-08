import type { Metadata } from "next";
import Dashboard from "@/components/pages/_dashboard";

export const metadata: Metadata = {
  title: "Dashboard | Super Admin",
  description: "Super Admin Dashboard",
};

export default function DashboardPage() {
  return <Dashboard />;
}
