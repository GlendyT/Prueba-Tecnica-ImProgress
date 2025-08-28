import React from "react";

interface FilterButtonsProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  label?: string;
}

const FilterButtons = ({
  value,
  onChange,
  options,
  label,
}: FilterButtonsProps) => {
  return (
    <div className="flex flex-col w-32 text-sm">
      <select
        id="department-filter"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-2 py-2 border rounded bg-[#edd5e7]"
      >
        <option value="" className="">
          {label}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt} >
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterButtons;
