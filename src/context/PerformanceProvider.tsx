"use client";

import { PerformanceProviderProps, PerformanceTypes } from "@/types/employee";
import { createContext } from "react";
const PerformanceContext = createContext<PerformanceTypes>(null!);

const PerformanceProvider = ({ children }: PerformanceProviderProps) => {
  return (
    <PerformanceContext.Provider value={{}}>
      {children}
    </PerformanceContext.Provider>
  );
};

export { PerformanceProvider };
export default PerformanceContext;
