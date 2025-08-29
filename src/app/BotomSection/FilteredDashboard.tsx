"use client";

import { cardBottomStyles, textStyles } from "@/utils/helpers";
import DonutChart from "./FilterComponents/DonutChart";
import HorizontalBarChart from "./FilterComponents/HorizontalBarChart";
import FilterButtons from "@/components/FilterButtons";
import usePerformance from "@/hooks/usePerformance";

const FilteredDashboard = () => {
  const { filtroValues, handleFilterChange: onFilterChange } = usePerformance();

  return (
    <div className={`${cardBottomStyles}`}>
      <div className="flex flex-wrap max-lg:justify-center  gap-2 mb-2 px-2 py-2 items-center justify-between bg-gray-100 rounded-lg w-full border-2 border-black  ">
        <h1 className={`${textStyles}`}>Filtrar rendimiento por:</h1>
        <div className="flex flex-wrap gap-2 w-auto justify-end ">
          {filtroValues.map(({ label, options, value }) => (
            <FilterButtons
              key={label}
              label={label}
              options={options}
              value={value}
              onChange={(value) => onFilterChange(label.toLowerCase(), value)}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-row max-lg:flex-col gap-4 w-full">
        <DonutChart />
        <HorizontalBarChart />
      </div>
    </div>
  );
};

export default FilteredDashboard;
