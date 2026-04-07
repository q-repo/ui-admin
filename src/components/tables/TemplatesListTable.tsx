import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

import Badge from "../ui/badge/Badge";

interface Template {
  id: number;
  title: string;
  category: string;
  status: string;
  description: string;
  created_at: string;
  updated_at: string;
}

// Define the table data using the interface
const tableData: Template[] = [
  {
    id: 1,
    title: "Welcome Email",
    category: "Email Templates",
    status: "Active",
    description: "Welcome email for new subscribers",
    created_at: "2024-01-15",
    updated_at: "2024-03-20",
  },
  {
    id: 2,
    title: "Password Reset",
    category: "Email Templates",
    status: "Active",
    description: "Password reset email template",
    created_at: "2024-02-10",
    updated_at: "2024-04-05",
  },
  {
    id: 3,
    title: "SaaS Landing Page",
    category: "Landing Pages",
    status: "Active",
    description: "Modern SaaS landing page design",
    created_at: "2024-01-20",
    updated_at: "2024-03-25",
  },
  {
    id: 4,
    title: "Product Launch",
    category: "Landing Pages",
    status: "Pending",
    description: "Product launch landing page",
    created_at: "2024-03-05",
    updated_at: "2024-04-02",
  },
  {
    id: 5,
    title: "Instagram Post",
    category: "Social Media",
    status: "Active",
    description: "Instagram promotion post template",
    created_at: "2024-01-12",
    updated_at: "2024-04-01",
  },
];

export default function TemplatesListTable() {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-dark">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-275.5">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-200 dark:border-gray-800">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Title
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Category
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Description
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Status
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Created At
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Updated At
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-200 dark:divide-gray-800">
              {tableData.map((template) => (
                <TableRow key={template.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      {template.title}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {template.category}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {template.description}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={
                        template.status === "Active"
                          ? "success"
                          : template.status === "Pending"
                          ? "warning"
                          : "error"
                      }
                    >
                      {template.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {template.created_at}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {template.updated_at}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
