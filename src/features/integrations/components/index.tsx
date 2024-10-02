import { NotFoundLayout } from "@/components/layouts/not-found-layout";
import { type Integration } from "@prisma/client";
import React from "react";
import { CurrentIntegrationCard } from "./current-integration-card";

export const Integrations: React.FC<{
  integrations: Integration[];
}> = ({ integrations }) => {
  if (integrations.length === 0) {
    return <NotFoundLayout type="Integration" url="/integrations/new" />;
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
