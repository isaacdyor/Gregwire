import React, { FC, ReactNode } from "react";
import { type Integration } from "@prisma/client";
import { CurrentIntegrationCard } from "./current-integration-card";

export const Integrations: React.FC<{
  integrations: Integration[];
  NewIntegrationButton: ReactNode;
}> = ({ integrations, NewIntegrationButton }) => {
  if (integrations.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex flex-col gap-2 pb-40">
          <p className="text-muted-foreground">No integrations found.</p>
          {NewIntegrationButton}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {integrations.map((integration) => (
        <CurrentIntegrationCard
          key={integration.id}
          integration={integration}
        />
      ))}
    </div>
  );
};
