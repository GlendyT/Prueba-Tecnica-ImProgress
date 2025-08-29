"use client";
import usePerformance from "@/hooks/usePerformance";
import { ReactApexChart } from "@/utils/ApexChart";
import { cardStyles, textStyles } from "@/utils/helpers";

const DonutChart = () => {
  const {  options, donutChartData } = usePerformance();

  return (
    <div className={`${cardStyles} w-full`}>
      <ReactApexChart
        options={options}
        series={donutChartData.series}
        type="donut"
        width={250}
        height={195}
      />
      <h1 className={`${textStyles}`}>Rendimiento Total por Departamento</h1>
    </div>
  );
};

export default DonutChart;
