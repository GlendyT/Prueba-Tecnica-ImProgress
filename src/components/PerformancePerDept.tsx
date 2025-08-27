"use client";

import usePerformance from "@/hooks/usePerformance";
import dynamic from "next/dynamic";
import { useMemo } from "react";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const PerformancePerDept = () => {
  const { company } = usePerformance();

  const departmentPerformance = useMemo(() => {
    if (!company || company.length === 0) return [];

    return company.map((manager) => {
      const productivity = parseInt(manager.teamProductivity) || 0;
      const workQuality = parseInt(manager.teamWorkquality) || 0;
      const compliance = parseInt(manager.teamCompliancedeadlines) || 0;
      const development = parseInt(manager.teamsdevelopment) || 0;
      const average =
        (productivity + workQuality + compliance + development) / 4;

      return {
        department: manager.department,
        averagePerformance: average,
      };
    });
  }, [company]);

  const chartSeries = [
    {
      name: "Rendimiento Promedio",
      data: departmentPerformance.map((d) => d.averagePerformance),
    },
    {
      name: "Resto",
      data: departmentPerformance.map((d) => 100 - d.averagePerformance),
    },
  ];

  const chartOptions = {
    chart: {
      type: "bar" as const,
      height: 150,
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "40%",
        borderRadius: 0,
      },
    },
    colors: [
      ({ dataPointIndex }: { dataPointIndex: number }) => {
        const barColors = ["#ae1580", "#480935"];
        return barColors[dataPointIndex % 2];
      },
      "#e5e7eb",
    ],
    dataLabels: {
      enabled: true,
      formatter: function (val: number, opts: { seriesIndex: number }) {
        if (opts.seriesIndex === 0) {
          return val.toFixed(1) + "%";
        }
        return "";
      },
      style: {
        colors: ["#fff"],
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 1,
        opacity: 0.45,
      },
    },
    stroke: {
      show: false,
    },
    xaxis: {
      min: 0,
      max: 100,
      position: "top",
      categories: departmentPerformance.map((d) => d.department),
      labels: {
        formatter: function (val: string) {
          return val + "%";
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {},
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    legend: {
      show: false,
    },
    tooltip: {
      y: {
        formatter: function (val: number) {
          return val.toFixed(1) + "%";
        },
      },
    },
  };

  if (departmentPerformance.length === 0) {
    return null;
  }

  return (
    <div className=" border-2 border-black rounded-md p-2 w-1/3 h-auto">
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height={350}
      />
      <h2 className="text-xl font-semibold mb-2 text-center">
        2024 <br />
        Average Employee Performance by Department Last Year
      </h2>
    </div>
  );
};

export default PerformancePerDept;
