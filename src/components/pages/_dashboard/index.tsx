import DemographicCard from "@/components/ecommerce/DemographicCard";
import dynamic from "next/dynamic";

const EcommerceMetrics = dynamic(() => import('@/components/pages/_dashboard/components/EcommerceMetrics'), { ssr: false });
const MonthlySalesChart = dynamic(() => import('@/components/pages/_dashboard/components/MonthlySalesChart'), { ssr: false });
const MonthlyTarget = dynamic(() => import('@/components/pages/_dashboard/components/MonthlyTarget'), { ssr: false });
const RecentOrders = dynamic(() => import('@/components/pages/_dashboard/components/RecentOrders'), { ssr: false });
const StatisticsChart = dynamic(() => import('@/components/pages/_dashboard/components/StatisticsChart'), { ssr: false });

export default function Dashboard() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-7">
        <EcommerceMetrics />

        <MonthlySalesChart />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <MonthlyTarget />
      </div>

      <div className="col-span-12">
        <StatisticsChart />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <DemographicCard />
      </div>

      <div className="col-span-12 xl:col-span-7">
        <RecentOrders />
      </div>
    </div>
  );
}