import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { Plus } from "lucide-react";

export const NewAutomationButton = () => {
  const mutation = api.automations.create.useMutation();
  return (
    <Button size="sm" className="flex items-center gap-2">
      Add new
      <Plus className="h-6 w-6" />
    </Button>
  );
};
