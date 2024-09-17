import { ContentLayout } from "@/components/layouts/content-layout";
import { Integrations } from "@/features/integrations/components";
import { api } from "@/trpc/server";

export default async function IntegrationsPage() {
  const integrations = await api.integrations.getAll();
  return (
    <ContentLayout title="Integrations">
      <Integrations integrations={integrations} />
    </ContentLayout>
  );
}
