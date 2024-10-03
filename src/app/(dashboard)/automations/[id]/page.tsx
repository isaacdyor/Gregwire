import { AutomationDetail } from "@/features/automations/components/detail";
import { api } from "@/trpc/server";

interface AutomationPageProps {
  params: { id: string };
}

export default async function AutomationPage({ params }: AutomationPageProps) {
  const automation = await api.automations.getById({ id: params.id });

  if (!automation) {
    return <div>Automation not found</div>;
  }

  return <AutomationDetail automation={automation} />;
}
