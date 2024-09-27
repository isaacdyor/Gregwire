import { ContentLayout } from "@/components/layouts/content-layout";
import { NoIntegrationLayout } from "@/components/layouts/no-integration-layout";
import { Messages } from "@/features/messages/components";
import { api } from "@/trpc/server";
import { GenericType } from "@prisma/client";

export default async function ChatsPage() {
  const integrations = await api.integrations.getByType({
    type: GenericType.MESSAGE,
  });

  const messages = await api.messages.getAll();

  return (
    <ContentLayout title="Messages">
      {integrations.length === 0 ? (
        <NoIntegrationLayout />
      ) : (
        <Messages messages={messages} />
      )}
    </ContentLayout>
  );
}
