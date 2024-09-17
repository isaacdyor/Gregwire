import { type Integration } from "@prisma/client";
import { Fragment } from "react";
import { CurrentIntegrationCard } from "./current-integration-card";

export const Integrations: React.FC<{ integrations: Integration[] }> = ({
  integrations,
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {integrations.map((integration) => (
        <Fragment key={integration.id}>
          <CurrentIntegrationCard integration={integration} />
        </Fragment>
      ))}
    </div>
  );
};
