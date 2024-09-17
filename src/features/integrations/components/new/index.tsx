"use client";

import { integrationConfig } from "@/config/integration-config";
import { NewIntegrationCard } from "./new-integration-card";

export const NewIntegration = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {integrationConfig.map((integration) => (
        <NewIntegrationCard key={integration.title} integration={integration} />
      ))}
    </div>
  );
};
