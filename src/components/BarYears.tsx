import usePerformance from "@/hooks/usePerformance";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const BarYears = () => {
  const { performancePerYear } = usePerformance();

  const chartSeries = [
    {
      name: "Rendimiento",
      data: performancePerYear.map((p) => parseInt(p.totalPerformance)),
    },
    {
      name: "Resto",
      data: performancePerYear.map((p) => 100 - parseInt(p.totalPerformance)),
    },
  ];

  const chartOptions = {
    chart: {
      type: "bar" as const,
      height: 350,
      stacked: true,
      toolbar: {
        show: false,
      },
    },

    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 0,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: false,
    },
    xaxis: {
      categories: performancePerYear.map((p) => p.year),
      labels: {
        rotate: -45,
        rotateAlways: true,
      },
    },
    yaxis: {
      labels: {
        formatter: (val: number) => `${val.toFixed(0)}%`,
      },
      max: 100,
    },
    colors: ["#480935", "#e5e7eb"],
    legend: {
      show: false,
    },
  };

  return (
    <div className=" border-2 border-black rounded-md p-2 w-1/3 h-auto">
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height={350}
      />
      <h2 className="text-xl font-semibold mb-2 text-center">
        Total Employee Performance Per Year
      </h2>
    </div>
  );
};

export default BarYears;
