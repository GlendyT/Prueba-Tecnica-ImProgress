import { CreateAreaOptions } from "@/types/employee";

const createAreaOptions = ({
  categories,
  yAxisMax = 1.0,
  yAxisMin = 0,
  yAxisFormatter,
  strokeColor = "#181d1d",
  markerColor = "#181d1d",
  gradientColors = ["#181d1d", "#480935", "#ae1580", "#edd5e7"],
}: CreateAreaOptions) => ({
  chart: { type: "area" as const, toolbar: { show: false } },
  xaxis: { categories },
  yaxis: {
    min: yAxisMin,
    max: yAxisMax,
    ...(yAxisFormatter && { labels: { formatter: yAxisFormatter } }),
  },
  dataLabels: { enabled: false },
  stroke: { colors: [strokeColor] },
  markers: {
    size: 5,
    colors: [markerColor],
    strokeColors: "#ffffff",
    strokeWidth: 2,
    hover: { size: 7 },
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      type: "vertical",
      shadeIntensity: 1,
      gradientToColors: [gradientColors[3]],
      inverseColors: false,
      opacityFrom: 0.8,
      opacityTo: 0.3,
      stops: [0, 100],
      colorStops: [
        { offset: 0, color: gradientColors[0], opacity: 1 },
        { offset: 25, color: gradientColors[1], opacity: 0.9 },
        { offset: 75, color: gradientColors[2], opacity: 0.7 },
        { offset: 100, color: gradientColors[3], opacity: 0.5 },
      ],
    },
  },
  grid: {
    padding: { left: 0, right: 0, top: 0, bottom: 0 },
    xaxis: { lines: { show: true } },
  },
});

export default createAreaOptions;
