import { ContentLayout } from "@/components/layouts/content-layout";
import { buttonVariants } from "@/components/ui/button";
import { Automations } from "@/features/automations/components";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/server";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function AutomationsPage() {
  const integrations = await api.integrations.getAll();

  const NewAutomationButton = () => {
    return (
      <Link
        href="/automations/new"
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
    <ContentLayout title="Automations" Action={<NewAutomationButton />}>
      <Automations integrations={integrations} />
    </ContentLayout>
  );
}
