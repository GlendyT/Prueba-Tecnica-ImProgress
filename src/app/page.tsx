"use client";

import { konkhmer } from "@/utils/helpers";
import FilteredDashboard from "./BotomSection/FilteredDashboard";
import TableInfo from "./BotomSection/TableInfo";
import BarDepartment from "./TopSection/BarDepartment";
import BarMonths from "./TopSection/BarMonths";
import TopDonutEmployee from "./TopSection/TopDonutEmployee";

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
