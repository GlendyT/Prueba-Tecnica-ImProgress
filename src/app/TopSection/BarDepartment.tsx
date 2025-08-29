"use client";

import usePerformance from "@/hooks/usePerformance";
import { ReactApexChart } from "@/utils/ApexChart";
import { cardStyles, textStyles } from "@/utils/helpers";

const BarDepartment = () => {
  const {
    chartOptions,
    chartSeries,
    isMobile,
    isTablet,
    isDesktop,
  } = usePerformance();

  const isLoading = !chartOptions || chartSeries.length === 0;
  const chartHeight = isMobile ? 300 : isTablet ? 400 : isDesktop ? 285 : 400;


  return (
    <div className={`${cardStyles}`} style={{ minHeight: chartHeight }}>
      {isLoading ? (
        <div
          className="flex items-center justify-center"
          style={{ height: chartHeight }}
        >
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <ReactApexChart
          options={chartOptions}
          series={chartSeries}
          type="bar"
          width={isMobile ? 350 : isTablet ? 500 : isDesktop ? 400 : 700}
          height={chartHeight}
        />
      )}

      <h2 className={`${textStyles}`}>Rendimiento por departamento</h2>
    </div>
  );
};

export default BarDepartment;
