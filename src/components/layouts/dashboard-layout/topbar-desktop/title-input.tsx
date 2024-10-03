"use client";

import { DebouncedInput } from "@/components/ui/debounced-input";
import { useAutomationStore } from "@/stores/automations";
import { api } from "@/trpc/react";

export const TitleInput: React.FC = () => {
  const { mutate: updateAutomation } = api.automations.update.useMutation();

  const { automation, setAutomation } = useAutomationStore((state) => state);
  if (!automation) {
    return null;
  }

  return (
    <DebouncedInput
      value={automation.title}
      setValue={(value) => {
        setAutomation({
          ...automation,
          title: value,
        });
      }}
      onChange={(value) => {
        updateAutomation({
          id: automation.id,
          title: value,
        });
      }}
      className="h-8 w-48 border-none bg-transparent p-0 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
      placeholder="Enter automation title"
    />
  );
};
