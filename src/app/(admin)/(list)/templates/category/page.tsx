import type { Metadata } from "next";
import React from "react";
import TemplateCategory from "@/components/pages/_templates/TemplateCategory";

export const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function TemplateCategoryPage() {
  return <TemplateCategory />;
}
