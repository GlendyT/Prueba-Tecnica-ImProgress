"use client";
import { ReactApexChart } from "@/utils/ApexChart";
import usePerformance from "@/hooks/usePerformance";
import { cardStyles, textStyles } from "@/utils/helpers";

const HorizontalBarChart = () => {
  const {
    horizontalBarOptions,
    horizontalBarSeries,
    isMobile,
    isTablet,
    isDesktop,
  } = usePerformance();

  return (
    <div className={`${cardStyles} w-full`}>
      <ReactApexChart
        options={horizontalBarOptions}
        series={horizontalBarSeries}
        type="bar"
        height={180}
        width={isMobile ? 350 : isTablet ? 400 : isDesktop ? 300 : 700}
      />

      <h1 className={`${textStyles}`}>Rendimiento Por Empleado</h1>
    </div>
  );
};

export default HorizontalBarChart;
