"use client";
import { useState } from "react";
import usePerformance from "@/hooks/usePerformance";
import { ReactApexChart } from "@/utils/ApexChart";
import { cardStyles, textStyles } from "@/utils/CardStyles";

const BarMonths = () => {
  const [isAreaView, setIsAreaView] = useState(false);
  const { barOptions, barSeries, options3, series3 } = usePerformance();

  return (
    <div className={`${cardStyles}`}>
      <ReactApexChart
        options={isAreaView ? options3 : barOptions}
        series={isAreaView ? series3 : barSeries}
        type={isAreaView ? "area" : "bar"}
        width={420}
        height={235}
      />
      <div className="flex w-full flex-row gap-2 justify-between items-center px-4 ">
        <h2 className={`${textStyles}`}>Rendimiento por Mes</h2>
        <button
          onClick={() => setIsAreaView(!isAreaView)}
          className="px-3 py-1 text-sm bg-[#480935] text-white rounded hover:bg-[#ae1580] transition-colors cursor-pointer"
        >
          {isAreaView ? "Barras" : "Área"}
        </button>
      </div>
    </div>
  );
};

export default BarMonths;
