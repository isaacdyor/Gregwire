import { NoIntegrationLayout } from "@/components/layouts/no-integration-layout";
import { type Integration } from "@prisma/client";
import { AutomationCard } from "./automation-card";

export const Automations: React.FC<{
  integrations: Integration[];
}> = ({ integrations }) => {
  if (integrations.length === 0) {
    return <NoIntegrationLayout />;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {integrations.map((integration) => (
        <AutomationCard key={integration.id} />
      ))}
    </div>
  );
};
