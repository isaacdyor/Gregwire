import { ContentLayout } from "@/components/layouts/content-layout";
import { Automations } from "@/features/automations/components";
import { api } from "@/trpc/server";
import { NewAutomationButton } from "./new-automation-button";

export default async function AutomationsPage() {
  const automations = await api.automations.getAll();

  return (
    <ContentLayout title="Automations" Action={<NewAutomationButton />}>
      <Automations automations={automations} />
    </ContentLayout>
  );
}
