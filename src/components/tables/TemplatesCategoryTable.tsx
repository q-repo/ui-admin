import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

import Badge from "../ui/badge/Badge";

interface TemplateCategory {
  id: number;
  name: string;
  description: string;
  status: string;
  total_templates: number;
  created_at: string;
  updated_at: string;
}

// Define the table data using the interface
const tableData: TemplateCategory[] = [
  {
    id: 1,
    name: "Email Templates",
    description: "Professional email templates for marketing campaigns",
    status: "Active",
    total_templates: 12,
    created_at: "2024-01-15",
    updated_at: "2024-03-20",
  },
  {
    id: 2,
    name: "Landing Pages",
    description: "High-converting landing page templates",
    status: "Active",
    total_templates: 8,
    created_at: "2024-02-10",
    updated_at: "2024-04-05",
  },
  {
    id: 3,
    name: "Social Media",
    description: "Social media post templates",
    status: "Active",
    total_templates: 15,
    created_at: "2024-01-20",
    updated_at: "2024-03-25",
  },
  {
    id: 4,
    name: "Reports",
    description: "Business report templates",
    status: "Inactive",
    total_templates: 5,
    created_at: "2024-03-05",
    updated_at: "2024-04-02",
  },
  {
    id: 5,
    name: "Forms",
    description: "Web form templates",
    status: "Active",
    total_templates: 10,
    created_at: "2024-01-12",
    updated_at: "2024-04-01",
  },
];

export default function TemplatesCategoryTable() {
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
                  Name
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
                  Total Templates
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
              {tableData.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      {category.name}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {category.description}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={
                        category.status === "Active"
                          ? "success"
                          : category.status === "Pending"
                          ? "warning"
                          : "error"
                      }
                    >
                      {category.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                    {category.total_templates}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {category.created_at}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {category.updated_at}
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
