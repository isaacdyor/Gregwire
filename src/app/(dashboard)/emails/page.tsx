import { ContentLayout } from "@/components/layouts/content-layout";
import { Emails } from "@/features/emails/components";
import { api } from "@/trpc/server";

export default async function MessagesPage() {
  const emails = await api.emails.getAll();
  const email = await api.emails.getByMessageId("1234567890");

  return (
    <ContentLayout title="Emails">
      <p>Messageid: {email?.messageId}</p>
      <Emails emails={emails} />
    </ContentLayout>
  );
}
