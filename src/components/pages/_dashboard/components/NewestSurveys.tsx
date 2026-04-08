"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Badge from "@/components/ui/badge/Badge";
import { Period } from "./PeriodFilter";

type SurveyStatus = "Created" | "In Progress" | "Done";

interface Survey {
  id: number;
  title: string;
  respondents: number;
  status: SurveyStatus;
  date: string;
}

const MOCK_SURVEYS: Record<Period, Survey[]> = {
  daily: [
    { id: 1, title: "Customer Satisfaction Q2",  respondents: 34,  status: "In Progress", date: "Today, 09:12" },
    { id: 2, title: "Product Feedback Survey",    respondents: 18,  status: "Created",     date: "Today, 08:45" },
    { id: 3, title: "Employee Engagement Poll",   respondents: 52,  status: "Done",        date: "Today, 07:30" },
    { id: 4, title: "NPS Monthly Tracker",        respondents: 9,   status: "In Progress", date: "Yesterday" },
    { id: 5, title: "Brand Awareness Check",      respondents: 67,  status: "Done",        date: "Yesterday" },
  ],
  monthly: [
    { id: 1, title: "Q2 Market Research",         respondents: 412, status: "In Progress", date: "Apr 8, 2026" },
    { id: 2, title: "UX Usability Study",         respondents: 230, status: "Created",     date: "Apr 6, 2026" },
    { id: 3, title: "HR Performance Review",      respondents: 188, status: "Done",        date: "Apr 3, 2026" },
    { id: 4, title: "Customer Churn Analysis",    respondents: 95,  status: "In Progress", date: "Mar 28, 2026" },
    { id: 5, title: "Sales Team Feedback",        respondents: 310, status: "Done",        date: "Mar 20, 2026" },
  ],
  yearly: [
    { id: 1, title: "Annual Customer NPS 2026",   respondents: 3200, status: "In Progress", date: "Jan 2026" },
    { id: 2, title: "Annual Employee Survey 2026",respondents: 1800, status: "Created",     date: "Jan 2026" },
    { id: 3, title: "Brand Perception 2025",      respondents: 4100, status: "Done",        date: "Dec 2025" },
    { id: 4, title: "Market Benchmark 2025",      respondents: 2750, status: "Done",        date: "Nov 2025" },
    { id: 5, title: "Product Roadmap Survey 2025",respondents: 900,  status: "In Progress", date: "Oct 2025" },
  ],
};

const STATUS_COLOR: Record<SurveyStatus, "warning" | "success" | "info"> = {
  "Created":     "info",
  "In Progress": "warning",
  "Done":        "success",
};

interface NewestSurveysProps {
  period: Period;
}

export default function NewestSurveys({ period }: NewestSurveysProps) {
  const surveys = MOCK_SURVEYS[period];

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
      {/* Header */}
      <div className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 dark:border-gray-800">
        <div>
          <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">
            Newest Surveys
          </h3>
          <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
            Latest 5 surveys
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-200 dark:border-gray-800">
            <TableRow>
              <TableCell isHeader className="px-5 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 text-start">
                Survey Title
              </TableCell>
              <TableCell isHeader className="px-5 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 text-start">
                Respondents
              </TableCell>
              <TableCell isHeader className="px-5 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 text-start">
                Status
              </TableCell>
              <TableCell isHeader className="px-5 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 text-start">
                Date
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-200 dark:divide-gray-800">
            {surveys.map((survey) => (
              <TableRow key={survey.id}>
                <TableCell className="px-5 py-3.5 text-start">
                  <span className="text-sm font-medium text-gray-800 dark:text-white/90">
                    {survey.title}
                  </span>
                </TableCell>
                <TableCell className="px-5 py-3.5 text-sm text-gray-500 dark:text-gray-400 text-start">
                  {survey.respondents.toLocaleString()}
                </TableCell>
                <TableCell className="px-5 py-3.5 text-start">
                  <Badge size="sm" color={STATUS_COLOR[survey.status]}>
                    {survey.status}
                  </Badge>
                </TableCell>
                <TableCell className="px-5 py-3.5 text-sm text-gray-500 dark:text-gray-400 text-start">
                  {survey.date}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
