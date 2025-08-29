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
import createAreaOptions from "@/components/AreaUtils";
import createBarOptions from "@/components/BarsUtils";
import createDonutOptions from "@/components/DonutUtil";
import { donutLabels, paleteColors } from "@/utils/helpers";
import { useMediaQuery } from "@mui/material";
import { createContext, useEffect, useMemo, useState } from "react";
const PerformanceContext = createContext<PerformanceTypes>(null!);

const PerformanceProvider = ({ children }: PerformanceProviderProps) => {
  const [company, setCompany] = useState<IndicatorsData>({} as IndicatorsData);
  const [graphs, setGraphs] = useState<GraphData[]>([]);
  const [table, setTable] = useState<TableData[]>([]);
  const [expand, setExpand] = useState(false);
  const totalEmployees = company?.totalEmployees || 0;
  const highPerformers = company?.highPerformers || 0;
  const lowPerformers = company?.lowPerformers || 0;
  const normalPerformers = totalEmployees - highPerformers - lowPerformers;
  const donutSeries = [highPerformers, normalPerformers, lowPerformers];
  const [filters, setFilters] = useState({
    department: "",
    status: "",
  });
  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(max-width:900px)");
  const isDesktop = useMediaQuery("(min-width:1024px)");
  const isLargeDesktop = useMediaQuery("(min-width:1200px)");
  const isXLargeDesktop = useMediaQuery("(min-width:1536px)");
  const departments = Array.from(new Set(table.map((row) => row.department)));
  const statuses = Array.from(new Set(table.map((row) => row.status)));

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
  // Handler para cambiar filtros
  const handleFilterChange = (filterName: string, value: string) => {
    const filterMap: { [key: string]: string } = {
      departamento: "department",
      estado: "status",
    };
    const actualFilterName = filterMap[filterName] || filterName;
    setFilters((prev) => ({ ...prev, [actualFilterName]: value }));
  };

  // Filtrar datos de la tabla según los filtros
  const filteredTable = table.filter((row) => {
    const departmentMatch =
      !filters.department || row.department === filters.department;
    const statusMatch = !filters.status || row.status === filters.status;
    return departmentMatch && statusMatch;
  });

  const columns: Column<TableData>[] = [
    { accessorKey: "name", header: "Nombre" },
    { accessorKey: "department", header: "Departamento" },
    {
      accessorKey: "performance",
      header: "Rendimiento",
      cell: (row: TableData) =>
        `${(Number(row.performance) * 100).toFixed(1)}%`,
    },
    { accessorKey: "status", header: "Estado" },
  ];

  //TODO: TOP SECTION

  //todo: Donut Chart
  const donutOptions = createDonutOptions({
    labels: donutLabels,
    colors: paleteColors,
    centerLabel: "Empleados",
    dataFormatter: (val: number) => {
      const percentage =
        totalEmployees > 0 ? ((val / totalEmployees) * 100).toFixed(1) : 0;
      return `${percentage}%`;
    },
    tooltipFormatter: (val: number) => {
      const percentage =
        totalEmployees > 0 ? ((val / totalEmployees) * 100).toFixed(1) : 0;
      return `${val} empleados (${percentage}%)`;
    },
    totalFormatter: (w: { globals: { seriesTotals: number[] } }) => {
      const total = w.globals.seriesTotals.reduce(
        (a: number, b: number) => a + b,
        0
      );
      return `${total}`;
    },
  });

  //todo: Bar Chart vertical
  // Preparar datos para el Bar Chart vertical con dos series
  const performanceData = graphs.map((g) => g.averagePerformance);
  const complementData = graphs.map((g) =>
    Math.max(0, 1 - g.averagePerformance)
  );
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
  const barOptions = createBarOptions({
    categories: graphs.map((g) => g.month),
    colors: ["#480935", "#edd5e7"],
    isStacked: true,
    yAxisMax: 1.0,
    yAxisFormatter: (val: number) => `${(val * 100).toFixed(0)}%`,
    columnWidth: "50%",
    tooltipFormatter: (val: number) => `${(val * 100).toFixed(1)}%`,
  });

  //todo: Area Chart
  const areaOptions = createAreaOptions({
    categories: graphs.map((g) => g.month),
    yAxisFormatter: (val: number) => `${(val * 100).toFixed(0)}%`,
  });

  //todo: Bar Chart Horizontal
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

  const chartOptions = createBarOptions({
    categories: departmentPerformance.map((d) => 
      d.department.length > 8 ? d.department.replace(' ', '\n') : d.department
    ),
    colors: [
      ({ dataPointIndex }: { dataPointIndex: number }) => {
        const barColors = ["#AE1580", "#480935"];
        return barColors[dataPointIndex % barColors.length];
      },
      "#edd5e7",
    ],
    isHorizontal: true,
    isStacked: true,
    yAxisMax: 100,
    barHeight: "40%",
    xAxisPosition: "top",
    xAxisFormatter: (value: string) => value + "%",
    dataLabelsEnabled: true,
    dataLabelsFormatter: (val: number, opts?: { seriesIndex: number }) => {
      if (opts?.seriesIndex === 0) {
        return val.toFixed(1) + "%";
      } else {
        return "";
      }
    },
    tooltipFormatter: (val: number) => val.toFixed(1) + "%",
  });

  //TODO: BOTTOM SECTION
  //todo: Table
  const allDepartments = Array.from(
    new Set(table.map((row) => row.department))
  );
  // Calcular series para todos los departamentos de la tabla completa
  const departmentSeries = allDepartments.map((dept) => {
    // Siempre usar datos de la tabla completa para mantener proporciones reales
    const deptRows = table.filter((row) => row.department === dept);
    const avg =
      deptRows.length > 0
        ? deptRows.reduce((acc, row) => acc + Number(row.performance), 0) /
          deptRows.length
        : 0;
    return avg * 100;
  });
  //todo: Donut Chart departamentos
  // Si hay filtro de departamento, aplicar opacidad a los demás
  let donutColorss = paleteColors.slice(0, allDepartments.length);
  if (filters.department) {
    donutColorss = allDepartments.map(
      (dept, idx) =>
        dept === filters.department
          ? paleteColors[idx % paleteColors.length]
          : paleteColors[idx % paleteColors.length] + "80"
    );
  }
  const donutChartData = {
    labels: allDepartments,
    series: departmentSeries,
    colors: donutColorss,
  };
  // Siempre mostrar todos los datos, nunca solo un departamento
  const options = createDonutOptions({
    labels: donutChartData.labels,
    colors: donutChartData.colors,
    centerLabel: filters.department ? filters.department : "Promedio",
    dataFormatter: (val: number) => val.toFixed(1) + "%",
    tooltipFormatter: (val: number) => val.toFixed(1) + "%",
    totalFormatter: (w: { globals: { seriesTotals: number[] } }) => {
      if (filters.department) {
        const deptRows = table.filter(
          (row) => row.department === filters.department
        );
        const avg =
          deptRows.length > 0
            ? (deptRows.reduce((acc, row) => acc + Number(row.performance), 0) /
                deptRows.length) *
              100
            : 0;
        return `${avg.toFixed(0)}%`;
      } else {
        const total = w.globals.seriesTotals.reduce(
          (a: number, b: number) => a + b,
          0
        );
        const avg =
          allDepartments.length > 0 ? total / allDepartments.length : 0;
        return `${avg.toFixed(0)}%`;
      }
    },
  });

  //todo: Bar Horizontal Chart
  const employeeLabels = filteredTable.map((row) => row.name);
  const employeeSeries = filteredTable.map(
    (row) => Number(row.performance) * 100
  );
  const barChartData = {
    labels: employeeLabels,
    series: employeeSeries,
  };
  const horizontalBarSeries = [
    {
      name: "Rendimiento",
      data: barChartData.series,
    },
  ];

  const horizontalBarOptions = createBarOptions({
    categories: barChartData.labels,
    colors: [
      ({ dataPointIndex }: { dataPointIndex: number }) => {
        const barColors = ["#AE1580", "#480935"];
        return barColors[dataPointIndex % 2];
      },
      "#edd5e7",
    ],
    isHorizontal: true,
    isStacked: true,
    yAxisMax: 100,
    xAxisFormatter: (value: string) => value + "%",
    dataLabelsEnabled: true,
    dataLabelsFormatter: (val: number) => val.toFixed(1) + "%",
    tooltipFormatter: (val: number) => val.toFixed(1) + "%",
  });

  const filtroValues = [
    { label: "Departamento", options: departments, value: filters.department },
    { label: "Estado", options: statuses, value: filters.status },
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
        options,
        horizontalBarOptions,
        horizontalBarSeries,
        areaOptions,
        isMobile,
        isTablet,
        isDesktop,
        isLargeDesktop,
        isXLargeDesktop,
        filtroValues,
      }}
    >
      {children}
    </PerformanceContext.Provider>
  );
};

export { PerformanceProvider };
export default PerformanceContext;
