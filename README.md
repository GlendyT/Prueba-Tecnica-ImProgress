# Improgress

A Next.js dashboard for employee performance tracking and visualization with interactive charts and data management.

## Prerequisites

- Node.js 18.0 or later
- npm, yarn, pnpm, or bun package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Improgress
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

## Running the Application

### Development Mode
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Production Build
```bash
npm run build
npm run start
```

## FIGMA FILE LINK

[Figma](https://www.figma.com/design/FQ1BXP3OpwRYfNm1POp3qO/ImprogressTest?node-id=0-1&t=LWKANiutIKjGn8E8-1)

## Tech Stack

| CATEGORY | TECHNOLOGY | VERSION | PURPOSE|
|----------|------------|---------|--------|
| **Framework:** | Next.js | 15.5 | React framework with SSR capabilities|
| **Runtime**	| React	 |19.1.0	|UI library for component-based architecture|
| **Language**	|TypeScript | 	|Type-safe JavaScript development|
| **Styling**|	Tailwind CSS|	4.x	|Utility-first CSS framework|
| **UI Library:** |Material-UI (MUI)| 7.3.1| Pre-built React components|
| **Charts**	|ApexCharts	|5.3.4	|Interactive data visualization|
| **Build Tool**	|Turbopack	|Latest|	Next.js optimized bundler|
   

## SOLID PRINCIPLES USED

- **Single Responsibility Principle (SRP):** Using a Provider that manages all performance-related state and data transformation for the dashboard. It centralizes data fetching, filtering, chart configuration, and state management in one cohesive unit.
- **Dependency Inversion Principle (DIP):** The architecture demonstrates DIP through its use of utility functions for chart creation. The provider depends on the abstraction of createAreaOptions, createBarOptions, and createDonutOptions rather than concrete implementations, allowing for flexible chart configuration. It also uses dependency injection by accepting children as props and wrapping them with a context.
- **Open/Closed Principle (OCP):** The chart configuration system follows OCP by using utility functions that can be extended with new options without modifying existing code. Each chart type uses configurable options objects, making the system open for extension but closed for modification.
- **Interface Segregation Principle (ISP):** The context provider exposes a comprehensive but focused interface through the PerformanceContext. Components can access only the specific data and functions they need through the usePerformance hook, rather than being forced to depend on unused functionality.
- The architecture primarily uses composition and functional patterns rather than class-based inheritance.

  
## Project Structure
```
src/
├── app/
│   ├── BotomSection/
│   │   ├── DonutChart.tsx      # Donut chart component
│   │   ├── HorizontalBarChart.tsx # Horizontal bar chart component
│   │   └── TableInfo.tsx        # Table information component
│   ├── TopSection/
│   │   ├── AreaMonth.tsx        # Monthly area chart
│   │   ├── BarDepartment.tsx    # Department bar chart
│   │   ├── BarMonths.tsx        # Monthly bar chart
│   │   └── TopDonutEmployee.tsx # Employee donut chart
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout component
│   └── page.tsx                 # Main dashboard page
├── components/
│   ├── AreaUtils.tsx            # Area chart utilities
│   ├── BarsUtils.tsx            # Bar chart utilities
│   ├── DonutUtil.tsx            # Donut chart utilities
│   ├── FilterButtons.tsx        # Filter button components
│   ├── FilterNav.tsx            # Filter Nav components
│   └── TableUtil.tsx            # Table utilities
├── context/
│   └── PerformanceProvider.tsx  # Performance data context
├── hooks/
│   └── usePerformance.tsx       # Performance data hook
├── types/
│   └── employee.ts              # Employee type definitions
└── utils/
    ├── ApexChart.tsx            # Chart wrapper component
    └── helpers.tsx              # Helper functions

public/
└── employeesData.json           # Employee data source
```
