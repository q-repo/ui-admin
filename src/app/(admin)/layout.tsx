import { authGuard } from "@/lib/auth";
import AdminLayoutClient from "./AdminLayoutClient";
import React from "react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Redirect to login if not authenticated
  await authGuard(true);

  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
