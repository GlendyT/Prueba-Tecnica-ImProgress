"use client";
import usePerformance from "@/hooks/usePerformance";
import FilterButtons from "@/utils/FilterButtons";

const Filter = () => {
  const {
    departments,
    statuses,
    months,
    filters,
    handleFilterChange: onFilterChange,
  } = usePerformance();

  const filtroValues = [
    { label: "Departamento", options: departments, value: filters.department },
    { label: "Status", options: statuses, value: filters.status },
    { label: "Mes", options: months, value: filters.month },
  ];

  return (
    <div className="flex flex-wrap gap-4 mb-2 px-2 py-2 items-center justify-between bg-gray-100 rounded-lg w-full  ">
      <h1 className="">Filtrar desempeño por:</h1>
      <div className="flex flex-wrap gap-2 ">
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
  );
};

export default Filter;
