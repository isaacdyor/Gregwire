import { ContentLayout } from "@/components/layouts/content-layout";
import { Emails } from "@/features/emails/components";
import { api } from "@/trpc/server";

export default async function MessagesPage() {
  const emails = await api.emails.getAll();

  return (
    <ContentLayout title="Emails">
      <Emails emails={emails} />
    </ContentLayout>
  );
}
