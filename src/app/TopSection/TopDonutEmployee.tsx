"use client";
import usePerformance from "@/hooks/usePerformance";
import { ReactApexChart } from "@/utils/ApexChart";
import { cardStyles, textStyles } from "@/utils/helpers";

const TopDonutEmployee = () => {
  const { donutOptions, donutSeries, isMobile, isTablet, isDesktop } =
    usePerformance();

  const isLoading = !donutSeries || donutSeries.length === 0;
  const chartHeight = isMobile ? 300 : isTablet ? 400 : isDesktop ? 300 : 400;
  return (
    <div className={`${cardStyles}`} style={{ minHeight: chartHeight }}>
      {isLoading ? (
        <div
          className="flex items-center justify-center"
          style={{ height: chartHeight }}
        >
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500">Cargando...</div>
        </div>
      ) : (
        <ReactApexChart
          options={donutOptions}
          series={donutSeries}
          type="donut"
          width={isMobile ? 300 : isTablet ? 400 : isDesktop ? 300 : 400}
          height={chartHeight}
        />
      )}
      <h1 className={`${textStyles}`}>Rendimiento Total de la Empresa</h1>
    </div>
  );
};

export default TopDonutEmployee;
