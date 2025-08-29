import { CreateDonutOptions } from "@/types/employee";

const createDonutOptions = ({
  labels,
  colors,
  centerLabel,
  dataFormatter,
  tooltipFormatter,
  totalFormatter,
}: CreateDonutOptions) => ({
  labels,
  colors,
  chart: { type: "donut" as const },
  legend: { show: false, position: "bottom" as const },
  dataLabels: { enabled: true, formatter: dataFormatter },
  plotOptions: {
    pie: {
      donut: {
        labels: {
          show: true,
          total: { show: true, label: centerLabel, formatter: totalFormatter },
          value: {
            show: true,
            formatter: (val: string) => `${Number(val).toFixed(0)}%`,
          },
        },
      },
    },
  },
  tooltip: { y: { formatter: tooltipFormatter } },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: { width: 200 },
        legend: { position: "bottom" as const },
      },
    },
  ],
});
export default createDonutOptions;
