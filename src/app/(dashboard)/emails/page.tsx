import { ContentLayout } from "@/components/layouts/content-layout";
import { columns } from "@/features/emails/components/columns";
import { EmailTable } from "@/features/emails/components/data-table";
import { api } from "@/trpc/server";

export default async function EmailsPage() {
  const emails = await api.emails.getAll();

  return (
    <ContentLayout title="Emails">
      <EmailTable columns={columns} emails={emails} />
    </ContentLayout>
  );
}
