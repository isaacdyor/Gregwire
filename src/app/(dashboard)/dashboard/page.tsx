import { ContentLayout } from "@/components/layouts/content-layout";
import { Dashboard } from "@/features/dashboard/components";

export default async function DashboardPage() {
  return (
    <ContentLayout title="Dashboard">
      <Dashboard />
    </ContentLayout>
  );
}
