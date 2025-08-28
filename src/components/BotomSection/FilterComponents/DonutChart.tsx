"use client";
import usePerformance from "@/hooks/usePerformance";
import { ReactApexChart } from "@/utils/ApexChart";
import { cardStyles, textStyles } from "@/utils/CardStyles";

const DonutChart = () => {
  const { showData, options } = usePerformance();

  return (
    <div className={`${cardStyles} w-full` }>
      <ReactApexChart
        options={options}
        series={showData.series}
        type="donut"
        width={250}
        height={195}
      />
      <h1 className={`${textStyles}`}>Rendimiento Total</h1>
    </div>
  );
};

export default DonutChart;
