import dynamic from "next/dynamic";
export const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
