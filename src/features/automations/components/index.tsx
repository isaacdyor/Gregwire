import { NotFoundLayout } from "@/components/layouts/not-found-layout";
import { type Automation } from "@prisma/client";
import { AutomationCard } from "./automation-card";
import { NewAutomationButton } from "@/app/(dashboard)/automations/new-automation-button";

export const Automations: React.FC<{
  automations: Automation[];
}> = ({ automations }) => {
  if (automations.length === 0) {
    return (
      <NotFoundLayout type="Automations" NewButton={<NewAutomationButton />} />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {automations.map((automation) => (
        <AutomationCard key={automation.id} automation={automation} />
      ))}
    </div>
  );
};
