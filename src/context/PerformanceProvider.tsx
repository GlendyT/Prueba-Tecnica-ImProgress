"use client";

import {
  CompanyData,
  Manager,
  PerformancePerYear,
  PerformanceProviderProps,
  PerformanceTypes,
} from "@/types/employee";

import { createContext, useEffect, useMemo, useState } from "react";
const PerformanceContext = createContext<PerformanceTypes>(null!);

const PerformanceProvider = ({ children }: PerformanceProviderProps) => {
  const [company, setCompany] = useState<Manager[]>([]);
  const [performancePerYear, setPerformancePerYear] = useState<
    PerformancePerYear[]
  >([]);

  // Using fetch to get data from local JSON file
  async function getCompanyData(): Promise<CompanyData> {
    const res = await fetch("/employeesData.json");
    if (!res.ok) throw new Error("Failed to fetch employee data");
    return res.json();
  }

  // Fetch data on component mount
  useEffect(() => {
    getCompanyData()
      .then((data) => {
        setCompany(data.company);
        setPerformancePerYear(data.performancePerYear);
      })
      .catch(console.error);
  }, []);

  //Retrieve data of last year performance
  const yearData = useMemo(
    () => performancePerYear?.find((p) => p.year === 2024),
    [performancePerYear]
  );
  const percent = yearData ? parseInt(yearData.totalPerformance) : 0;
  const chartOptions = {
    chart: {
      type: "donut" as const,
    },
    labels: ["Performance 2024", "Rest"],
    colors: ["#ae1580", "#e5e7eb"],
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
      formatter: function (val: number) {
        return val.toFixed(0) + "%";
      },
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              showAlways: true,
              label: "",
              formatter: () => "2024",
            },
          },
        },
      },
    },
  };
  const chartSeries = [percent, 100 - percent];

  //Retrieve data when performancePerYear


  return (
    <PerformanceContext.Provider
      value={{
        getCompanyData,
        company,
        setCompany,
        performancePerYear,
        setPerformancePerYear,
        percent,
        chartOptions,
        chartSeries,
      }}
    >
      {children}
    </PerformanceContext.Provider>
  );
};

export { PerformanceProvider };
export default PerformanceContext;
