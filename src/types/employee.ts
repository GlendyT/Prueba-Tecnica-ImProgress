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

type FilterState = {
  department: string;
  status: string;
};

type chartOptionsType = {
  series?: number[];
  labels?: string[];
  colors?: string[];
};


type ChartSeriesType = {
  name: string;
  data: number[];
}[];

type ChartOptionsType = {
  [K in
    | "options"
    | "donutOptions"
    | "barOptions"
    | "chartOptions"
    | "horizontalBarOptions"
    | "areaOptions"]: ApexOptions;
};

export interface PerformanceTypes extends ChartOptionsType {
  getCompanyData: () => Promise<CompanyData>;
  company: IndicatorsData;
  setCompany: React.Dispatch<React.SetStateAction<IndicatorsData>>;
  graphs: GraphData[];
  setGraphs: React.Dispatch<React.SetStateAction<GraphData[]>>;
  table: TableData[];
  setTable: React.Dispatch<React.SetStateAction<TableData[]>>;
  setExpand: React.Dispatch<React.SetStateAction<boolean>>;
  filters: FilterState;
  departments: string[];
  statuses: string[];
  handleFilterChange: (filterName: string, value: string) => void;
  filteredTable: TableData[];
  donutSeries: number[];
  columns: Column<TableData>[];
  donutColorss: string[];
  barSeries: ChartSeriesType;
  chartSeries: ChartSeriesType;
  horizontalBarSeries: ChartSeriesType;
  donutChartData: chartOptionsType;
  barChartData: chartOptionsType;
  departmentPerformance: { department: string; averagePerformance: number }[];
  expand: boolean;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLargeDesktop: boolean;
  isXLargeDesktop: boolean;
  filtroValues: { label: string; options: string[]; value: string }[];
}

export type PerformanceProviderProps = {
  children: React.ReactNode;
};

export type Column<T> = {
  accessorKey: keyof T;
  cell?: (info: T) => React.ReactNode;
  header: string;
  align?: "right";
};

export type TableUtilProps<T> = {
  data: T[];
  columns: Column<T>[];
  onClick: () => void;
  expand: boolean;
};

export type CreateDonutOptions = {
  labels: string[];
  colors: string[];
  centerLabel: string;
  dataFormatter: (val: number) => string;
  tooltipFormatter: (val: number) => string;
  totalFormatter: (w: { globals: { seriesTotals: number[] } }) => string;
};

export type CreateBarOptions = {
  categories: string[];
  colors:
    | string[]
    | (string | ((opts: { dataPointIndex: number }) => string))[];
  isHorizontal?: boolean;
  isStacked?: boolean;
  yAxisMax?: number;
  yAxisMin?: number;
  yAxisFormatter?: (val: number) => string;
  xAxisFormatter?: (val: string) => string;
  dataLabelsEnabled?: boolean;
  dataLabelsFormatter?: (val: number, opts?: { seriesIndex: number }) => string;
  tooltipFormatter?: (val: number, opts?: { seriesIndex: number }) => string;
  columnWidth?: string;
  barHeight?: string;
  xAxisPosition?: "top" | "bottom";
};


export type CreateAreaOptions =  {
  categories: string[];
  yAxisMax?: number;
  yAxisMin?: number;
  yAxisFormatter?: (val: number) => string;
  strokeColor?: string;
  markerColor?: string;
  gradientColors?: string[];
}


export type FilterButtonsProps = {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  label?: string;
}