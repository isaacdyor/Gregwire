import { ContentLayout } from "@/components/layouts/content-layout";
import { buttonVariants } from "@/components/ui/button";
import { Integrations } from "@/features/integrations/components";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/server";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function IntegrationsPage() {
  const integrations = await api.integrations.getAll();

  const NewIntegrationButton = () => {
    return (
      <Link
        href="/integrations/new"
        className={cn(
          buttonVariants({ size: "sm" }),
          "flex items-center gap-2",
        )}
      >
        Add new
        <Plus className="h-6 w-6" />
      </Link>
    );
  };

  return (
    <ContentLayout title="Integrations" Action={<NewIntegrationButton />}>
      <Integrations
        integrations={integrations}
        NewIntegrationButton={<NewIntegrationButton />}
      />
    </ContentLayout>
  );
}
