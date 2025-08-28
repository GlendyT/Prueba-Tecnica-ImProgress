"use client";
import usePerformance from "@/hooks/usePerformance";
import { ReactApexChart } from "@/utils/ApexChart";
import { cardStyles, textStyles } from "@/utils/CardStyles";

const Circle = () => {
  const { donutOptions, donutSeries } = usePerformance();
  return (
    <div className={`${cardStyles}`}>
      <ReactApexChart
        options={donutOptions}
        series={donutSeries}
        type="donut"
        width={350}
        height={250}
      />
      <h1 className={`${textStyles}`}>Rendimiento de Empleados</h1>
    </div>
  );
};

export default Circle;
