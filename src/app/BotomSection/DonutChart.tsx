"use client";
import usePerformance from "@/hooks/usePerformance";
import { ReactApexChart } from "@/utils/ApexChart";
import { bottomSmallCards, textStyles } from "@/utils/helpers";

const DonutChart = () => {
  const { options, donutChartData, isMobile, isTablet, isDesktop } =
    usePerformance();

  const isLoading =
    !donutChartData.series || donutChartData.series.length === 0;
  const chartHeight = isMobile ? 300 : isTablet ? 400 : isDesktop ? 220 : 400;

  return (
    <div className={`${bottomSmallCards} `} style={{ minHeight: chartHeight }}>
      {isLoading ? (
        <div
          className="flex items-center justify-center"
          style={{ height: chartHeight }}
        >
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <ReactApexChart
          options={options}
          series={donutChartData.series}
          type="donut"
          width={isMobile ? 300 : isTablet ? 400 : isDesktop ? 205 : 400}
          height={chartHeight}
        />
      )}
      <h1 className={`${textStyles}`}>Rendimiento Total por Departamento</h1>
    </div>
  );
};

export default DonutChart;
