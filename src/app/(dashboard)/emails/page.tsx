import { ContentLayout } from "@/components/layouts/content-layout";
import { NotFoundLayout } from "@/components/layouts/not-found-layout";
import { columns } from "@/features/emails/components/columns";
import { EmailTable } from "@/features/emails/components/data-table";
import { api } from "@/trpc/server";

export default async function EmailsPage() {
  const emails = await api.emails.getAll();
  const integrations = await api.gmail.getAll();

  return (
    <ContentLayout title="Emails">
      {integrations.length === 0 ? (
        <NotFoundLayout type="Email Integrations" url="/emails/new" />
      ) : (
        <EmailTable columns={columns} emails={emails} />
      )}
    </ContentLayout>
  );
}
