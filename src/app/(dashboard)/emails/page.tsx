import { ContentLayout } from "@/components/layouts/content-layout";
import { NoIntegrationLayout } from "@/components/layouts/no-integration-layout";
import { columns } from "@/features/emails/components/columns";
import { EmailTable } from "@/features/emails/components/data-table";
import { api } from "@/trpc/server";

export default async function EmailsPage() {
  const emails = await api.emails.getAll();
  const integrations = await api.gmail.getAll();

  return (
    <ContentLayout title="Emails">
      {integrations.length === 0 ? (
        <NoIntegrationLayout genericType="Email" />
      ) : (
        <EmailTable columns={columns} emails={emails} />
      )}
    </ContentLayout>
  );
}
