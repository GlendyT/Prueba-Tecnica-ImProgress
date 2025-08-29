"use client";
import usePerformance from "@/hooks/usePerformance";
import { ReactApexChart } from "@/utils/ApexChart";


const AreaChart = () => {
  const { areaOptions, barSeries } = usePerformance();

  return (
    <ReactApexChart
      options={areaOptions}
      series={barSeries}
      type="area"
      height={250}
    />
  );
};

export default AreaChart;
