"use client";

import usePerformance from "@/hooks/usePerformance";
import { ReactApexChart } from "@/utils/ApexChart";
import { cardStyles, textStyles } from "@/utils/CardStyles";

const PerformancePerDept = () => {
  const { departmentPerformance, chartOptions, chartSeries } = usePerformance();
  if (departmentPerformance.length === 0) {
    return null;
  }
  return (
    <div className={`${cardStyles}`}>
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        width={420}
        height={240}
      />
      <h2 className={`${textStyles}`}>Rendimiento por departamento</h2>
    </div>
  );
};

export default PerformancePerDept;
