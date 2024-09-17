import { ContentLayout } from "@/components/layouts/content-layout";
import { NewIntegration } from "@/features/integrations/components/new";

export default async function NewIntegrationPage() {
  return (
    <ContentLayout title="New Integration" backLink="/integrations">
      <NewIntegration />
    </ContentLayout>
  );
}
