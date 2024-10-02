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
      className="absolute left-2 top-2 z-20 m-2 h-8 w-72 border-none bg-transparent text-xl font-semibold focus-visible:ring-0 focus-visible:ring-offset-0"
      placeholder="Enter automation title"
    />
  );
};
