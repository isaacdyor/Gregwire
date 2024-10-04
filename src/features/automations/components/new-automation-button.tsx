"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { Loader2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export const NewAutomationButton = () => {
  const router = useRouter();

  const { mutate: createAutomation, isPending: automationPending } =
    api.automations.create.useMutation({
      onSuccess: (data) => {
        router.push(`/automations/${data.id}?index=0`);
      },
    });

  return (
    <Button
      onClick={() => createAutomation()}
      size="sm"
      className="flex items-center gap-2"
    >
      Add new
      {automationPending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Plus className="h-4 w-4" />
      )}
    </Button>
  );
};
