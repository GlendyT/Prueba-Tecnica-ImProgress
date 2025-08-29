import { CreateBarOptions } from "@/types/employee";

const createBarOptions = ({
  categories,
  colors,
  isHorizontal = false,
  isStacked = false,
  yAxisMax,
  yAxisMin = 0,
  yAxisFormatter,
  xAxisFormatter,
  dataLabelsEnabled = false,
  dataLabelsFormatter,
  tooltipFormatter,
  columnWidth,
  barHeight,
  xAxisPosition,
}: CreateBarOptions) => ({
  chart: { type: "bar" as const, stacked: isStacked, toolbar: { show: false } },
  plotOptions: {
    bar: {
      horizontal: isHorizontal,
      ...(columnWidth && { columnWidth }),
      ...(barHeight && { barHeight }),
      borderRadius: 0,
    },
  },
  colors,
  fill: { type: "solid" },
  dataLabels: {
    enabled: dataLabelsEnabled,
    ...(dataLabelsFormatter && { formatter: dataLabelsFormatter }),
    style: { colors: ["#ffffff"], fontSize: "10px" },
  },
  stroke: { show: true },
  xaxis: {
    categories,
    ...(yAxisMin !== undefined && { min: yAxisMin }),
    ...(yAxisMax && { max: yAxisMax }),
    ...(xAxisPosition && { position: xAxisPosition }),
    ...(xAxisFormatter && { labels: { formatter: xAxisFormatter } }),
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  ...(yAxisMax && {
    yaxis: {
      min: yAxisMin,
      max: yAxisMax,
      ...(yAxisFormatter && { labels: { formatter: yAxisFormatter } }),
    },
  }),
  grid: {
    xaxis: { lines: { show: true } },
    yaxis: { lines: { show: false } },
  },
  legend: { show: false, position: "bottom" as const },
  tooltip: { y: { formatter: tooltipFormatter } },
});

export default createBarOptions;
