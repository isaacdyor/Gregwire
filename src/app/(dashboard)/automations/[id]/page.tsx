import { AutomationDetail } from "@/features/automations/components/detail";
import { api, HydrateClient } from "@/trpc/server";

interface AutomationPageProps {
  params: { id: string };
}

export default async function AutomationPage({ params }: AutomationPageProps) {
  await api.automations.getById.prefetch({ id: params.id });

  return (
    <HydrateClient>
      <AutomationDetail automationId={params.id} />
    </HydrateClient>
  );
}
