"use client";

import React from "react";
import { ArrowUpIcon, ArrowDownIcon } from "@/icons";
import Badge from "@/components/ui/badge/Badge";
import { Period } from "./PeriodFilter";

interface MetricCardProps {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  value: string;
  trend: number; // positive = up, negative = down
}

function MetricCard({ icon, iconBg, label, value, trend }: MetricCardProps) {
  const isUp = trend >= 0;
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3 md:p-6">
      <div className="flex items-start justify-between">
        <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${iconBg}`}>
          {icon}
        </div>
      </div>
      <div className="flex items-end justify-between mt-5">
        <div>
          <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
          <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">{value}</h4>
        </div>
        <Badge color={isUp ? "success" : "error"}>
          {isUp ? <ArrowUpIcon /> : <ArrowDownIcon />}
          {Math.abs(trend)}%
        </Badge>
      </div>
    </div>
  );
}

// Mock data keyed by period
const MOCK: Record<Period, { users: string; created: string; inProgress: string; done: string; usersTrend: number; createdTrend: number; inProgressTrend: number; doneTrend: number }> = {
  daily:   { users: "128",    created: "12",  inProgress: "5",   done: "7",   usersTrend: 4.2,  createdTrend: 8.1,  inProgressTrend: -2.3, doneTrend: 10.5 },
  monthly: { users: "3,782",  created: "204", inProgress: "48",  done: "156", usersTrend: 11.0, createdTrend: 6.4,  inProgressTrend: 3.1,  doneTrend: 14.2 },
  yearly:  { users: "41,200", created: "1.8k",inProgress: "320", done: "1.5k",usersTrend: 22.5, createdTrend: 18.7, inProgressTrend: -1.4, doneTrend: 20.3 },
};

interface DashboardMetricsProps {
  period: Period;
}

export default function DashboardMetrics({ period }: DashboardMetricsProps) {
  const d = MOCK[period];

  const cards: MetricCardProps[] = [
    {
      label: "Users Registered",
      value: d.users,
      trend: d.usersTrend,
      iconBg: "bg-blue-50 dark:bg-blue-500/10",
      icon: (
        <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4v-2a4 4 0 014-4h1m4-4a4 4 0 100-8 4 4 0 000 8z" />
        </svg>
      ),
    },
    {
      label: "Survey Created",
      value: d.created,
      trend: d.createdTrend,
      iconBg: "bg-violet-50 dark:bg-violet-500/10",
      icon: (
        <svg className="w-6 h-6 text-violet-600 dark:text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6M5 8h14M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" />
        </svg>
      ),
    },
    {
      label: "Survey In Progress",
      value: d.inProgress,
      trend: d.inProgressTrend,
      iconBg: "bg-amber-50 dark:bg-amber-500/10",
      icon: (
        <svg className="w-6 h-6 text-amber-500 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      label: "Survey Done",
      value: d.done,
      trend: d.doneTrend,
      iconBg: "bg-green-50 dark:bg-green-500/10",
      icon: (
        <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {cards.map((card) => (
        <MetricCard key={card.label} {...card} />
      ))}
    </div>
  );
}
