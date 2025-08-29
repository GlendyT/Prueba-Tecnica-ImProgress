"use client";

import usePerformance from "@/hooks/usePerformance";
import { ReactApexChart } from "@/utils/ApexChart";
import { cardStyles, textStyles } from "@/utils/helpers";

const BarDepartment = () => {
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
        height={isMobile ? 300 : isTablet ? 500 : isDesktop ? 235 : 500}
      />
      <h2 className={`${textStyles}`}>Rendimiento por departamento</h2>
    </div>
  );
};

export default BarDepartment;
