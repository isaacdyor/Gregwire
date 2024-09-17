import { ContentLayout } from "@/components/layouts/content-layout";
import { Integrations } from "@/features/integrations/components";
import { api } from "@/trpc/server";

export default async function IntegrationsPage() {
  const integrations = api.integrations.getAll();
  return (
    <ContentLayout title="Integrations">
      <Integrations />
    </ContentLayout>
  );
}
