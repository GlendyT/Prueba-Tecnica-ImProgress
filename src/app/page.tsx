"use client";

import TableInfo from "@/components/BotomSection/TableInfo";
import FilteredDashboard from "@/components/BotomSection/FilteredDashboard";
import BarMonths from "@/components/TopSection/BarMonths";
import { konkhmer } from "@/utils/helpers";
import BarDepartment from "@/components/TopSection/BarDepartment";
import TopDonutEmployee from "@/components/TopSection/TopDonutEmployee";

const Dashboard = () => {
  return (
    <section
      className={`flex min-h-screen flex-col gap-2 items-center justify-between px-14 py-1 max-sm:px-4 ${konkhmer.className}`}
    >
      <h1 className="text-xl font-bold text-center">
        Employee Performance Dashboard
      </h1>
      <div className="flex flex-row max-lg:flex-wrap w-full items-start justify-center gap-4 ">
        <TopDonutEmployee />
        <BarMonths />
        <BarDepartment />
      </div>

      <div className="flex flex-row max-lg:flex-wrap w-full items-start justify-center gap-4">
        <TableInfo />
        <FilteredDashboard />
      </div>
    </section>
  );
};

export default Dashboard;
