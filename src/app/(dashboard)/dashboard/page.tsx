import { ContentLayout } from "@/components/layouts/content-layout";
import { Dashboard } from "@/features/dashboard/components";
import { WordwareClient } from "wordware";

export default async function DashboardPage() {
  const client = new WordwareClient({ apiKey: "YOUR_API_KEY" });
  await client.apps.listApps();
  return (
    <ContentLayout title="Dashboard">
      <Dashboard />
    </ContentLayout>
  );
}
