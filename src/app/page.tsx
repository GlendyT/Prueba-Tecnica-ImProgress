"use client";

import { cardBottomStyles, konkhmer } from "@/utils/helpers";
import TableInfo from "./BotomSection/TableInfo";
import BarDepartment from "./TopSection/BarDepartment";
import BarMonths from "./TopSection/BarMonths";
import TopDonutEmployee from "./TopSection/TopDonutEmployee";
import DonutChart from "./BotomSection/DonutChart";
import HorizontalBarChart from "./BotomSection/HorizontalBarChart";
import FilterNav from "../components/FilterNav";

const Dashboard = () => {
  return (
    <section
      className={`flex min-h-screen flex-col gap-1 items-center justify-center mb-2  px-8 max-sm:px-4 w-full bg-gray-100 ${konkhmer.className}`}
    >
      <h1 className="text-xl font-bold text-center max-2xl:text-red-400 max-xl:text-green-500 max-lg:text-blue-500 max-md:text-purple-500 max-sm:text-yellow-500">
        Employee Performance Dashboard
      </h1>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex flex-row max-lg:flex-wrap w-full items-start justify-between gap-8 max-lg:gap-2 px-2">
          <TopDonutEmployee />
          <BarMonths />
          <BarDepartment />
        </div>

        <div className="flex flex-row max-lg:flex-wrap w-full items-start justify-between gap-2  ">
          <TableInfo />
          <div className={`${cardBottomStyles}`}>
            <FilterNav />
            <div className="flex flex-row w-full h-full bg-white rounded-lg shadow-2xl max-lg:flex-col items-center gap-2">
              <DonutChart />
              <HorizontalBarChart />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
