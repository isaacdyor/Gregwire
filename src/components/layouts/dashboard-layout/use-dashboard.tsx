"use client";

import { useContext } from "react";
import { DashboardContext } from "./dashboard-context";

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
};
