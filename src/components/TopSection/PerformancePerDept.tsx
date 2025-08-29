"use client";

import usePerformance from "@/hooks/usePerformance";
import { ReactApexChart } from "@/utils/ApexChart";
import { cardStyles, textStyles } from "@/utils/helpers";

const PerformancePerDept = () => {
  const {
    departmentPerformance,
    chartOptions,
    chartSeries,
    isMobile,
    isTablet,
    isDesktop,
  } = usePerformance();
  if (departmentPerformance.length === 0) {
    return null;
  }
  return (
    <div className={`${cardStyles}`}>
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        width={isMobile ? 350 : isTablet ? 500 : isDesktop ? 400 : 700}
        height={240}
      />
      <h2 className={`${textStyles}`}>Rendimiento por departamento</h2>
    </div>
  );
};

export default PerformancePerDept;
