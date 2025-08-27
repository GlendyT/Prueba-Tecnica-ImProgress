"use client";

import BarYears from "@/components/BarYears";
import Circle from "@/components/Circle";
import PerformancePerDept from "@/components/PerformancePerDept";

const Dashboard = () => {
  return (
    <section className="flex min-h-screen flex-col items-center justify-between p-4">
      <h1 className="text-3xl font-bold">
        Employee Performance Dashboard 2024
      </h1>
      <div className="flex flex-row w-full items-end justify-center gap-10 h-96 ">
        <Circle />
        <BarYears />
        <PerformancePerDept />{" "}
      </div>
    </section>
  );
};

export default Dashboard;
