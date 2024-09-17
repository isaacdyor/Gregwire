"use client";

import { integrationConfig } from "@/config/integration-config";
import { Fragment } from "react";
import { NewIntegrationCard } from "./new-integration-card";

export const NewIntegration = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {integrationConfig.map((integration) => (
        <Fragment key={integration.title}>
          <NewIntegrationCard integration={integration} />
        </Fragment>
      ))}
    </div>
  );
};
