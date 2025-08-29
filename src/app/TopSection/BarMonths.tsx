"use client";
import { useState } from "react";
import usePerformance from "@/hooks/usePerformance";
import { ReactApexChart } from "@/utils/ApexChart";
import { cardStyles, textStyles } from "@/utils/helpers";

const BarMonths = () => {
  const [isAreaView, setIsAreaView] = useState(false);
  const { barOptions, barSeries, areaOptions, isMobile, isTablet, isDesktop } =
    usePerformance();

  const isLoading = !barSeries || barSeries.length === 0;
  const chartHeight = isMobile ? 250 : isTablet ? 400 : isDesktop ? 256 : 300;

  return (
    <div className={`${cardStyles}`} style={{ minHeight: chartHeight + 80 }}>
      {isLoading ? (
        <div className="flex items-center justify-center" style={{ height: chartHeight }}>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <ReactApexChart
          options={isAreaView ? areaOptions : barOptions}
          series={isAreaView ? [barSeries[0]] : barSeries}
          type={isAreaView ? "area" : "bar"}
          width={isMobile ? 350 : isTablet ? 600 : isDesktop ? 300 : 700}
          height={chartHeight}
        />
      )}
      <div className="flex w-full flex-row justify-between items-center px-4 ">
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
