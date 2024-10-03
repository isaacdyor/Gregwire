import { api } from "@/trpc/react";
import { Plus } from "lucide-react";

export const AddActionButton: React.FC<{
  firstIndex: number;
  secondIndex?: number;
  automationId: string;
}> = ({ firstIndex, secondIndex, automationId }) => {
  const utils = api.useUtils();
  const { mutate: addAction } = api.actions.create.useMutation({
    onSuccess: async () => {
      await utils.automations.getById.invalidate();
    },
  });

  return (
    <div
      onClick={() =>
        addAction({
          type: "EMAIL",
          position: 0,
          automation: {
            connect: {
              id: automationId,
            },
          },
        })
      }
      className="group flex h-8 w-8 items-center justify-center rounded-full hover:cursor-pointer hover:bg-border"
    >
      <Plus className="text-muted-foreground" />
    </div>
  );
};
