import { ApexOptions } from "apexcharts";

export type IndicatorsData = {
  totalEmployees: number;
  averagePerformance: number;
  highPerformers: number;
  lowPerformers: number;
};

export type GraphData = {
  month: string;
  averagePerformance: number;
};

export type TableData = {
  id: number;
  name: string;
  department: string;
  performance: string;
  status: string;
};

export type CompanyData = {
  indicatorsData: IndicatorsData;
  graphData: GraphData[];
  tableData: TableData[];
};

export interface PerformanceTypes {
  getCompanyData: () => Promise<CompanyData>;
  company: IndicatorsData;
  setCompany: React.Dispatch<React.SetStateAction<IndicatorsData>>;
  graphs: GraphData[];
  setGraphs: React.Dispatch<React.SetStateAction<GraphData[]>>;
  table: TableData[];
  setTable: React.Dispatch<React.SetStateAction<TableData[]>>;
  filters: {
    department: string;
    status: string;
    month: string;
  };
  departments: string[];
  statuses: string[];
  months: string[];
  handleFilterChange: (filterName: string, value: string) => void;
  filteredTable: TableData[];
  donutSeries: number[];
  donutOptions: ApexOptions;
  barSeries: { name: string; data: number[] }[];
  barOptions: ApexOptions;
  chartSeries: { name: string; data: number[] }[];
  chartOptions: ApexOptions;
  departmentPerformance: { department: string; averagePerformance: number }[];
  expand: boolean;
  setExpand: React.Dispatch<React.SetStateAction<boolean>>;
  columns: Column<TableData>[];
  donutColorss: string[];
  donutChartData: { series: number[]; labels: string[]; colors: string[] };
  barChartData: { series: number[]; labels: string[]; colors?: string[] };
  areaChartData: { series: number[]; labels: string[]; colors?: string[] };
  options: ApexOptions;
  showData: { series: number[]; labels: string[]; colors?: string[] };
  options2: ApexOptions;
  series2: { name: string; data: number[] }[];
  options3: ApexOptions;
  series3: { name: string; data: number[] }[];
}

export type PerformanceProviderProps = {
  children: React.ReactNode;
};

export type DonutChartProps = {
  data: {
    series: number[];
    labels: string[];
    colors?: string[];
  };
};

export type HorizontalBarChartProps = DonutChartProps;
export type AreaChartProps = DonutChartProps;

export type Column<T> = {
  accessorKey: keyof T;
  cell?: (info: T) => React.ReactNode;
  header: string;
  align?: "left" | "right" | "center";
};

export type TableUtilProps<T> = {
  data: T[];
  columns: Column<T>[];
  onClick: () => void;
  expand: boolean;
};
