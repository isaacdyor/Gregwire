import { Plus } from "lucide-react";

export const CreateTriggerButton = () => {
  return (
    <div className="flex items-center justify-center rounded-full border border-border bg-background hover:cursor-pointer">
      <Plus className="h-40 w-40 p-8 text-foreground" />
    </div>
  );
};
