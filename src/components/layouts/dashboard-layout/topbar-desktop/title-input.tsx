"use client";

import { DebouncedInput } from "@/components/ui/debounced-input";
import { useAutomationStore } from "@/stores/automations";

export const TitleInput: React.FC = () => {
  const { automationTitle, setAutomationTitle } = useAutomationStore(
    (state) => state,
  );
  if (!automationTitle) {
    return null;
  }

  return (
    <DebouncedInput
      value={automationTitle}
      setValue={setAutomationTitle}
      onChange={(value) => {
        console.log("Updating automation name to:", value);
      }}
      className="h-8 w-48 border-none bg-transparent p-0 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
      placeholder="Enter automation title"
    />
  );
};
