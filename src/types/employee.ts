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

export type CompanyData = {
  company: Manager[];
};

export type PerformanceTypes = {

}

export type PerformanceProviderProps = {
  children: React.ReactNode;
}