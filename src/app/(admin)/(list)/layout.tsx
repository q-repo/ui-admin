"use client"
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { usePathname } from "next/navigation";

export default function BreadcrumbLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <div>
      <PageBreadcrumb
        pageTitle={pathname?.split("/").slice(-1)[0].replace(/-/g, " ")}
      />
      <div className="space-y-6">
        <ComponentCard title="Basic Table 1">
          {children}
        </ComponentCard>
      </div>
    </div>
  );
}