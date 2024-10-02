import { ContentLayout } from "@/components/layouts/content-layout";
import { Automations } from "@/features/automations/components";
import { NewAutomationButton } from "@/features/automations/components/new-automation-button";
import { api } from "@/trpc/server";

export default async function AutomationsPage() {
  const automations = await api.automations.getAll();

  return (
    <ContentLayout title="Automations" Action={<NewAutomationButton />}>
      <Automations automations={automations} />
    </ContentLayout>
  );
}
