"use client";

import { textStyles } from "@/utils/helpers";
import FilterButtons from "@/components/FilterButtons";
import usePerformance from "@/hooks/usePerformance";

const FilterNav = () => {
  const { filtroValues, handleFilterChange: onFilterChange } = usePerformance();

  return (
    <div className={`  w-full`}>
      <div className="flex flex-wrap max-lg:justify-center  gap-2 mb-2 px-2 py-2 items-center justify-between bg-white rounded-lg w-full shadow-2xl  ">
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
    </div>
  );
};

export default FilterNav;
