"use client";
import { ReactApexChart } from "@/utils/ApexChart";
import usePerformance from "@/hooks/usePerformance";
import { cardStyles, textStyles } from "@/utils/CardStyles";

const HorizontalBarChart = () => {
  const { options2, series2 } = usePerformance();

  return (
    <div className={`${cardStyles} w-full`}>
      <ReactApexChart
        options={options2}
        series={series2}
        type="bar"
        height={200}
      />

      <h1 className={`${textStyles}`}>Rendimiento Total</h1>
    </div>
  );
};

export default HorizontalBarChart;
