"use client";

import React from "react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { Period } from "./PeriodFilter";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

// Mock series data keyed by period
const SERIES_DATA: Record<Period, { categories: string[]; created: number[]; done: number[]; inProgress: number[] }> = {
  daily: {
    categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    created:    [5, 8, 6, 10, 7, 4, 9],
    inProgress: [3, 5, 4, 6,  4, 2, 5],
    done:       [2, 3, 2, 4,  3, 2, 4],
  },
  monthly: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    created:    [18, 22, 19, 25, 21, 17, 23, 28, 26, 30, 27, 32],
    inProgress: [10, 12, 11, 14, 13, 9,  14, 16, 15, 18, 16, 19],
    done:       [8,  10, 8,  11, 8,  8,  9,  12, 11, 12, 11, 13],
  },
  yearly: {
    categories: ["2020", "2021", "2022", "2023", "2024", "2025"],
    created:    [120, 180, 210, 260, 310, 380],
    inProgress: [60,  90,  110, 130, 160, 195],
    done:       [60,  90,  100, 130, 150, 185],
  },
};

interface SurveyStatisticsChartProps {
  period: Period;
}

export default function SurveyStatisticsChart({ period }: SurveyStatisticsChartProps) {
  const data = SERIES_DATA[period];

  const options: ApexOptions = {
    legend: { show: true, position: "top", horizontalAlign: "left" },
    colors: ["#465FFF", "#F59E0B", "#10B981"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 310,
      type: "line",
      toolbar: { show: false },
    },
    stroke: { curve: "smooth", width: [2, 2, 2] },
    fill: { type: "gradient", gradient: { opacityFrom: 0.45, opacityTo: 0 } },
    markers: { size: 0, strokeColors: "#fff", strokeWidth: 2, hover: { size: 6 } },
    grid: {
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
    },
    dataLabels: { enabled: false },
    tooltip: { enabled: true },
    xaxis: {
      type: "category",
      categories: data.categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
      tooltip: { enabled: false },
    },
    yaxis: {
      labels: { style: { fontSize: "12px", colors: ["#6B7280"] } },
      title: { text: "", style: { fontSize: "0px" } },
    },
  };

  const series = [
    { name: "Created",     data: data.created },
    { name: "In Progress", data: data.inProgress },
    { name: "Done",        data: data.done },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/3 sm:px-6 sm:pt-6">
      <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Survey Statistics
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Overview of survey activity over time
          </p>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="min-w-150 xl:min-w-full">
          <ReactApexChart options={options} series={series} type="area" height={310} />
        </div>
      </div>
    </div>
  );
}
