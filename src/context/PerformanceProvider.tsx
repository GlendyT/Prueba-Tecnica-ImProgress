"use client";

import {
  Column,
  CompanyData,
  GraphData,
  IndicatorsData,
  PerformanceProviderProps,
  PerformanceTypes,
  TableData,
} from "@/types/employee";
import { ApexOptions } from "apexcharts";

import { createContext, useEffect, useMemo, useState } from "react";
const PerformanceContext = createContext<PerformanceTypes>(null!);

const PerformanceProvider = ({ children }: PerformanceProviderProps) => {
  const [company, setCompany] = useState<IndicatorsData>({} as IndicatorsData);
  const [graphs, setGraphs] = useState<GraphData[]>([]);
  const [table, setTable] = useState<TableData[]>([]);
  // Datos para el gráfico de dona
  const totalEmployees = company?.totalEmployees || 0;
  const highPerformers = company?.highPerformers || 0;
  const lowPerformers = company?.lowPerformers || 0;
  const normalPerformers = totalEmployees - highPerformers - lowPerformers;

  const donutSeries = [highPerformers, normalPerformers, lowPerformers];
  const donutLabels = [
    "Rendimiento Alto",
    "Rendimiento Normal",
    "Rendimiento Bajo",
  ];
  // Filtros
  const [filters, setFilters] = useState({
    department: "",
    status: "",
    month: "",
  });

  // Opciones únicas para los filtros
  const departments = Array.from(new Set(table.map((row) => row.department)));
  const statuses = Array.from(new Set(table.map((row) => row.status)));
  const months = Array.from(new Set(graphs.map((g) => g.month)));

  // Handler para cambiar filtros
  const handleFilterChange = (filterName: string, value: string) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }));
  };

  // Filtrar datos de la tabla según los filtros
  const filteredTable = table.filter((row) => {
    const departmentMatch =
      !filters.department || row.department === filters.department;
    const statusMatch = !filters.status || row.status === filters.status;
    // Nota: El filtro de mes solo afecta a los gráficos, no a la tabla ya que la tabla no tiene datos por mes
    return departmentMatch && statusMatch;
  });

  // Using fetch to get data from local JSON file
  async function getCompanyData(): Promise<CompanyData> {
    const res = await fetch("/employeesData.json");
    if (!res.ok) throw new Error("Failed to fetch employee data");
    const data = await res.json();
    return data;
  }
  // Fetch data on component mount
  useEffect(() => {
    getCompanyData()
      .then((data) => {
        setCompany(data.indicatorsData);
        setGraphs(data.graphData);
        setTable(data.tableData);
      })
      .catch(console.error);
  }, []);

  const donutColors = ["#ae1580", "#480935", "#181d1d"];
  const donutOptions = {
    labels: donutLabels,
    chart: {
      type: "donut" as const,
    },
    legend: {
      show: false,
      position: "bottom" as const,
    },
    colors: donutColors,
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        const percentage =
          totalEmployees > 0 ? ((val / totalEmployees) * 100).toFixed(1) : 0;
        return `${percentage}%`;
      },
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              label: "Empleados",
              formatter: function (w: { globals: { seriesTotals: number[] } }) {
                const total = w.globals.seriesTotals.reduce(
                  (a: number, b: number) => a + b,
                  0
                );
                return `${total}`;
              },
            },
          },
        },
      },
    },
    tooltip: {
      y: {
        formatter: function (val: number) {
          const percentage =
            totalEmployees > 0 ? ((val / totalEmployees) * 100).toFixed(1) : 0;
          return `${val} empleados (${percentage}%)`;
        },
      },
    },
  };

  // Preparar datos para el Bar Chart vertical con dos series
  const performanceData = graphs.map((g) => g.averagePerformance);
  const complementData = graphs.map((g) =>
    Math.max(0, 1 - g.averagePerformance)
  ); // Complemento al 100%

  const barSeries = [
    {
      name: "Rendimiento",
      data: performanceData,
    },
    {
      name: " Faltante",
      data: complementData,
    },
  ];

  const barOptions = {
    chart: {
      type: "bar" as const,
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: graphs.map((g) => g.month),
    },
    yaxis: {
      min: 0,
      max: 1.0,
      labels: {
        formatter: function (val: number) {
          return `${(val * 100).toFixed(0)}%`;
        },
      },
    },
    colors: ["#480935", "#edd5e7"], // Color principal y color para el complemento
    fill: {
      type: "solid",
    },
    dataLabels: {
      enabled: false, // Deshabilitar dataLabels para mejor visualización
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
      },
    },
    legend: {
      show: false,
      position: "bottom" as const,
    },
    tooltip: {
      y: {
        formatter: function (val: number, opts: { seriesIndex: number }) {
          if (opts.seriesIndex === 0) {
            return `${(val * 100).toFixed(1)}%`;
          } else {
            return `${(val * 100).toFixed(1)}%`;
          }
        },
      },
    },
  };

  // Agrupar por departamento y calcular promedio de performance
  const departmentPerformance = useMemo(() => {
    if (!table || table.length === 0) return [];
    const deptMap: { [key: string]: number[] } = {};
    table.forEach((row) => {
      if (!deptMap[row.department]) deptMap[row.department] = [];
      deptMap[row.department].push(Number(row.performance));
    });
    return Object.entries(deptMap).map(([department, performances]) => ({
      department,
      averagePerformance:
        performances.reduce((a, b) => a + b, 0) / performances.length,
    }));
  }, [table]);

  const chartSeries = [
    {
      name: "Performance promedio",
      data: departmentPerformance.map((d) => d.averagePerformance * 100),
    },
    {
      name: " Faltante",
      data: departmentPerformance.map((d) =>
        Math.max(0, 100 - d.averagePerformance * 100)
      ),
    },
  ];

  const chartOptions = {
    chart: {
      type: "bar" as const,
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
      "#edd5e7",
    ],
    fill: {
      type: "solid",
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return val.toFixed(1) + "%";
      },
      style: {
        colors: ["#ffffff"],
        fontSize: "10px",
      },
    },
    stroke: {
      show: true,
    },
    xaxis: {
      min: 0,
      max: 100,
      position: "top" as const,
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
      position: "bottom" as const,
    },
    tooltip: {
      y: {
        formatter: function (val: number) {
          return val.toFixed(1) + "%";
        },
      },
    },
  };
  const [expand, setExpand] = useState(false);
  const columns: Column<TableData>[] = [
    { accessorKey: "name", header: "Nombre" },
    { accessorKey: "department", header: "Departamento" },
    { accessorKey: "performance", header: "Rendimiento" },
    { accessorKey: "status", header: "Estado" },
  ];

  const allDepartments = Array.from(
    new Set(table.map((row) => row.department))
  );
  const departmentLabels = allDepartments;

  // Calcular series para todos los departamentos de la tabla completa
  const departmentSeries = departmentLabels.map((dept) => {
    // Siempre usar datos de la tabla completa para mantener proporciones reales
    const deptRows = table.filter((row) => row.department === dept);
    const avg =
      deptRows.length > 0
        ? deptRows.reduce((acc, row) => acc + Number(row.performance), 0) /
          deptRows.length
        : 0;
    return avg;
  });

  // Colores base
  const baseColors = ["#edd5e7", "#ae1580", "#480935", "#181d1d"];
  // Si hay filtro de departamento, aplicar opacidad a los demás
  let donutColorss = baseColors.slice(0, departmentLabels.length);
  if (filters.department) {
    donutColorss = departmentLabels.map(
      (dept, idx) =>
        dept === filters.department
          ? baseColors[idx % baseColors.length]
          : baseColors[idx % baseColors.length] + "80" // Agrega opacidad (hex '80' = 50%)
    );
  }
  const donutChartData = {
    labels: departmentLabels,
    series: departmentSeries,
    colors: donutColorss,
  };

  // Siempre mostrar todos los datos, nunca solo un departamento
  const showData = donutChartData;

  // Opciones estilo Circle
  const options = {
    labels: showData.labels,
    colors: showData.colors,
    chart: {
      type: "donut" as const,
    },
    legend: {
      show: false,
      position: "bottom" as const,
    },
    dataLabels: {
      enabled: true,
    },
  };

  // HorizontalBarChart: rendimiento por empleado
  const employeeLabels = filteredTable.map((row) => row.name);
  const employeeSeries = filteredTable.map((row) => Number(row.performance));
  const barChartData = {
    labels: employeeLabels,
    series: employeeSeries,
  };

  // AreaChart: rendimiento anual (por mes)
  // Si hay filtro de mes, solo muestra ese mes; si no, todos los meses
  let areaLabels: string[] = [];
  let areaSeries: number[] = [];
  if (filters.month) {
    const graph = graphs.find((g) => g.month === filters.month);
    if (graph) {
      areaLabels = [graph.month];
      areaSeries = [graph.averagePerformance];
    }
  } else if (graphs.length > 0) {
    // Combina todos los meses y promedios
    areaLabels = graphs.map((g) => g.month);
    areaSeries = graphs.map((g) => g.averagePerformance);
  }
  const areaChartData = {
    labels: areaLabels,
    series: areaSeries,
  };

  const options2: ApexOptions = {
    chart: {
      type: "bar",
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    colors: [
      ({ dataPointIndex }: { dataPointIndex: number }) => {
        const barColors = ["#ae1580", "#480935"];
        return barColors[dataPointIndex % 2];
      },
      "#edd5e7",
    ],
    fill: {
      type: "solid",
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    xaxis: {
      categories: barChartData.labels,
    },
  };

  const series2 = [
    {
      name: "Rendimiento",
      data: barChartData.series,
    },
  ];


    const options3: ApexOptions = {
      chart: {
        type: "area",
        toolbar: {
          show: false,
        },
        
      },
      xaxis: {
        categories: areaChartData.labels,
      },
      yaxis: {
        min: 0,
        max: 1.0,
        labels: {
          formatter: function (val: number) {
            return `${(val * 100).toFixed(0)}%`;
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        colors: ["#181d1d"],
      },
      markers: {
        size: 5,
        colors: ["#181d1d"],
        strokeColors: "#ffffff",
        strokeWidth: 2,
        hover: {
          size: 7,
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "vertical",
          shadeIntensity: 1,
          gradientToColors: ["#edd5e7"],
          inverseColors: false,
          opacityFrom: 0.8,
          opacityTo: 0.3,
          stops: [0, 100],
          colorStops: [
            {
              offset: 0,
              color: "#181d1d",
              opacity: 1,
            },
            {
              offset: 25,
              color: "#480935",
              opacity: 0.9,
            },
            {
              offset: 75,
              color: "#ae1580",
              opacity: 0.7,
            },
            {
              offset: 100,
              color: "#edd5e7",
              opacity: 0.5,
            },
          ],
        },
      },

      grid: {
        padding: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        },
        xaxis: {
          lines: {
            show: true,
          },
        },
      },
    };
  
    const series3 = [
      {
        name: "Rendimiento Promedio",
        data: areaChartData.series,
      },
    ];
  

  return (
    <PerformanceContext.Provider
      value={{
        getCompanyData,
        company,
        setCompany,
        graphs,
        setGraphs,
        table,
        setTable,
        filters,
        departments,
        statuses,
        months,
        handleFilterChange,
        filteredTable,
        donutSeries,
        donutOptions,
        barOptions,
        barSeries,
        chartOptions,
        chartSeries,
        departmentPerformance,
        expand,
        setExpand,
        columns,
        donutColorss,
        donutChartData,
        barChartData,
        areaChartData,
        options,
        showData,
        options2,
        series2,
        options3,
        series3,
      }}
    >
      {children}
    </PerformanceContext.Provider>
  );
};

export { PerformanceProvider };
export default PerformanceContext;
