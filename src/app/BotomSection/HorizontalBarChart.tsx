"use client";
import { ReactApexChart } from "@/utils/ApexChart";
import usePerformance from "@/hooks/usePerformance";
import { bottomSmallCards,  textStyles } from "@/utils/helpers";

const HorizontalBarChart = () => {
  const {
    horizontalBarOptions,
    horizontalBarSeries,
    isMobile,
    isTablet,
    isDesktop,
  } = usePerformance();

  const isLoading = !horizontalBarSeries || horizontalBarSeries.length === 0;
  const chartHeight = isMobile ? 350 : isTablet ? 500 : isDesktop ? 210 : 500;

  return (
    <div className={`${bottomSmallCards}  border-l-2`} style={{ minHeight: chartHeight }}>
      {isLoading ? (
        <div
          className="flex items-center justify-center"
          style={{ height: chartHeight }}
        >
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <ReactApexChart
          options={horizontalBarOptions}
          series={horizontalBarSeries}
          type="bar"
          height={chartHeight}
          width={isMobile ? 350 : isTablet ? 600 : isDesktop ? 400 : 700}
        />
      )}

      <h1 className={`${textStyles}`}>Rendimiento Por Empleado</h1>
    </div>
  );
};

export default HorizontalBarChart;
