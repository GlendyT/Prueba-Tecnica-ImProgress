"use client";
import { useState } from "react";
import usePerformance from "@/hooks/usePerformance";
import { ReactApexChart } from "@/utils/ApexChart";
import { cardStyles, textStyles } from "@/utils/helpers";

const BarMonths = () => {
  const [isAreaView, setIsAreaView] = useState(false);
  const { barOptions, barSeries, areaOptions, isMobile, isTablet, isDesktop } =
    usePerformance();

  return (
    <div className={`${cardStyles}`}>
      <ReactApexChart
        options={isAreaView ? areaOptions : barOptions}
        series={isAreaView ? [barSeries[0]] : barSeries}
        type={isAreaView ? "area" : "bar"}
        width={isMobile ? 350 : isTablet ? 500 : isDesktop ? 400 : 700}
        height={isMobile ? 250 : isTablet ? 200 : isDesktop ? 229 : 300}
      />
      <div className="flex w-full flex-row gap-2 justify-between items-center px-4 ">
        <h2 className={`${textStyles}`}>Rendimiento por Mes</h2>
        <button
          onClick={() => setIsAreaView(!isAreaView)}
          className="px-3 py-1 text-sm bg-[#480935] text-white rounded hover:bg-[#AE1580] transition-colors cursor-pointer"
        >
          {isAreaView ? "Barras" : "Área"}
        </button>
      </div>
    </div>
  );
};

export default BarMonths;
