"use client";
import PerformanceContext from "@/context/PerformanceProvider";
import { useContext } from "react";

const usePerformance = () => {
  return useContext(PerformanceContext);
};
export default usePerformance;
