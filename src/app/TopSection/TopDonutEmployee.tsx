"use client";
import usePerformance from "@/hooks/usePerformance";
import { ReactApexChart } from "@/utils/ApexChart";
import { cardStyles, textStyles } from "@/utils/helpers";

const TopDonutEmployee = () => {
  const { donutOptions, donutSeries, isMobile, isTablet, isDesktop } = usePerformance();
  return (
    <div className={`${cardStyles}`}>
      <ReactApexChart
        options={donutOptions}
        series={donutSeries}
        type="donut"
        width={250}
        height={ isMobile ? 400 : isTablet ? 500 : isDesktop ? 400 : 500 }
      />
      <h1 className={`${textStyles}`}>Rendimiento Total de la Empresa</h1>
    </div>
  );
};

export default TopDonutEmployee;
