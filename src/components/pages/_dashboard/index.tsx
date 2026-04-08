"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import PeriodFilter, { Period } from "./components/PeriodFilter";

const DashboardMetrics = dynamic(() => import("./components/DashboardMetrics"), { ssr: false });
const SurveyStatisticsChart = dynamic(() => import("./components/SurveyStatisticsChart"), { ssr: false });
const NewestSurveys = dynamic(() => import("./components/NewestSurveys"), { ssr: false });

export default function Dashboard() {
  const [period, setPeriod] = useState<Period>("monthly");

  return (
    <div className="space-y-6">
      {/* Global period filter */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">Dashboard</h2>
        <PeriodFilter value={period} onChange={setPeriod} />
      </div>

      {/* Row 1: 4 metric cards */}
      <DashboardMetrics period={period} />

      {/* Row 2: Statistics chart */}
      <SurveyStatisticsChart period={period} />

      {/* Row 3: Newest surveys table */}
      <NewestSurveys period={period} />
    </div>
  );
}
