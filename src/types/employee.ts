import { ApexOptions } from "apexcharts";

export interface Employee {
  name: string;
  position: string;
  performance: string;
}

export type TeamMember = {
  name: string;
  role: string;
  productivity: string;
  workQuality: string;
  complianceDeadlines: string;
  development: string;
};

export type Manager = {
  id: number;
  manager: string;
  position: string;
  department: string;
  teamProductivity: string;
  teamWorkquality: string;
  teamCompliancedeadlines: string;
  teamsdevelopment: string;
  teamMembers: TeamMember[];
};

export type PerformancePerYear = {
  id: number;
  year: number;
  totalPerformance: string;
};

export type CompanyData = {
  company: Manager[];
  performancePerYear: PerformancePerYear[];
};

export type PerformanceTypes = {
  getCompanyData: () => Promise<CompanyData>;
  company: Manager[];
  setCompany: React.Dispatch<React.SetStateAction<Manager[]>>;
  performancePerYear: PerformancePerYear[];
  setPerformancePerYear: React.Dispatch<
    React.SetStateAction<PerformancePerYear[]>
  >;
  percent: number;
    chartOptions: ApexCharts.ApexOptions;
  chartSeries: number[];
};

export type PerformanceProviderProps = {
  children: React.ReactNode;
};

export type PerformanceData = {
  performancePerYear: PerformancePerYear[];
};
