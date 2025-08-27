"use client";
import usePerformance from "@/hooks/usePerformance";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const Circle = () => {
  const { chartOptions, chartSeries } = usePerformance();

  return (
    <div className="flex flex-col items-center justify-center border-2 border-black rounded-md p-2 w-1/3 h-auto">
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="donut"
        width={300}
      />
      <div className="text-xl text-black font-semibold">
        Total Employe Performance of Last Year
      </div>
    </div>
  );
};

export default Circle;
