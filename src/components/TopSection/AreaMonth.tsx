"use client";
import usePerformance from "@/hooks/usePerformance";
import { ReactApexChart } from "@/utils/ApexChart";


const AreaChart = () => {
  const { options3, series3 } = usePerformance();

  return (
    <ReactApexChart
      options={options3}
      series={series3}
      type="area"
      height={250}
    />
  );
};

export default AreaChart;
