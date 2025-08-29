import { FilterButtonsProps } from "@/types/employee";

const FilterButtons = ({
  value,
  onChange,
  options,
  label,
}: FilterButtonsProps) => {
  return (
    <div className="flex flex-col w-36 text-sm max-lg:text-xs cursor-pointer ">
      <select
        id="department-filter"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-2 py-1.5 shadow-2xl rounded cursor-pointer bg-[#edd5e7]"
      >
        <option value="" className=" cursor-pointer">
          {label}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt} className="cursor-pointer">
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterButtons;
