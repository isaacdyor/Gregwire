import { ContentLayout } from "@/components/layouts/content-layout";
import { NotFoundLayout } from "@/components/layouts/not-found-layout";
import { Messages } from "@/features/messages/components";
import { api } from "@/trpc/server";

export default async function MessagesPage() {
  const integrations = await api.slack.getAll();
  const messages = await api.messages.getAll();

  return (
    <ContentLayout title="Messages">
      {integrations.length === 0 ? (
        <NotFoundLayout type="Messages Integrations" url="/integrations/new" />
      ) : (
        <Messages messages={messages} />
      )}
    </ContentLayout>
  );
}
