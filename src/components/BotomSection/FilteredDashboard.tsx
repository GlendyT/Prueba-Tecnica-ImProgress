"use client";

import DonutChart from "./FilterComponents/DonutChart";
import Filter from "./FilterComponents/Filter";
import HorizontalBarChart from "./FilterComponents/HorizontalBarChart";

const FilteredDashboard = () => {
  return (
    <div className="w-1/2 flex flex-col gap-0 max-sm:w-full">
      <Filter />

      <div className="flex flex-row max-sm:flex-col gap-2 w-full">
        <DonutChart />
        <HorizontalBarChart />
      </div>
    </div>
  );
};

export default FilteredDashboard;
