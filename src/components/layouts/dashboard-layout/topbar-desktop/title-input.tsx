import React, { useState } from "react";
import { DebouncedInput } from "@/components/ui/debounced-input";

export const TitleInput: React.FC<{ title: string }> = ({ title }) => {
  const [automationTitle, setAutomationTitle] = useState<string>(title);

  return (
    <DebouncedInput
      value={automationTitle}
      setValue={setAutomationTitle}
      onChange={(value) => {
        console.log(value);
      }}
      className="h-8 w-48 border-none bg-transparent p-0 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
      placeholder="Enter automation title"
    />
  );
};
