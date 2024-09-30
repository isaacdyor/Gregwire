import { ContentLayout } from "@/components/layouts/content-layout";
import { NoIntegrationLayout } from "@/components/layouts/no-integration-layout";
import { Messages } from "@/features/messages/components";
import { api } from "@/trpc/server";

export default async function MessagesPage() {
  const integrations = await api.slack.getAll();
  const messages = await api.messages.getAll();

  return (
    <ContentLayout title="Messages">
      {integrations.length === 0 ? (
        <NoIntegrationLayout genericType="Messages" />
      ) : (
        <Messages messages={messages} />
      )}
    </ContentLayout>
  );
}
