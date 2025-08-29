"use client";
import Circle from "@/components/TopSection/CircleBar";
import PerformancePerDept from "@/components/TopSection/PerformancePerDept";
import TableInfo from "@/components/BotomSection/TableInfo";
import FilteredDashboard from "@/components/BotomSection/FilteredDashboard";
import BarMonths from "@/components/TopSection/BarMonths";
import { konkhmer } from "@/utils/helpers";

const Dashboard = () => {
  return (
    <section
      className={`flex min-h-screen flex-col gap-0 items-center justify-between px-14 py-2 max-sm:px-4 ${konkhmer.className}`}
    >
      <h1 className="text-2xl font-bold text-center">
        Employee Performance Dashboard
      </h1>
      <div className="flex flex-row max-lg:flex-wrap w-full items-start justify-center gap-6 ">
        <Circle />
        <BarMonths />
        <PerformancePerDept />
      </div>

      <div className="flex flex-row max-lg:flex-wrap w-full items-start justify-center gap-6">
        <TableInfo />
        <FilteredDashboard />
      </div>
    </section>
  );
};

export default Dashboard;
