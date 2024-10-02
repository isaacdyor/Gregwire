import { AutomationDetail } from "@/features/automations/components/detail";
import { api } from "@/trpc/server";

export default async function AutomationPage() {
  const automation = await api.automations.getById({ id: "1" });
  if (!automation) {
    return <div>Automation not found</div>;
  }
  return <AutomationDetail automation={automation} />;
}
