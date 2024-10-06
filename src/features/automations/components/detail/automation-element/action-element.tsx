import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/trpc/react";
import { type Action } from "@prisma/client";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
interface ActionElementProps {
  action: Action;
  index: number;
}

export const ActionElement: React.FC<ActionElementProps> = ({
  action,
  index,
}) => {
  const utils = api.useUtils();
  const router = useRouter();
  const automationId = action.automationId;

  const { mutate: deleteAction } = api.actions.delete.useMutation({
    onMutate: async ({ id }) => {
      await utils.automations.getById.cancel({ id: automationId });
      const previousAutomation = utils.automations.getById.getData({
        id: automationId,
      });
      utils.automations.getById.setData({ id: automationId }, (prevData) => {
        if (!prevData) return prevData;

        const updatedActions = prevData.actions.filter(
          (action) => action.id !== id,
        );

        return {
          ...prevData,
          actions: updatedActions,
        };
      });
      return { previousAutomation };
    },
    onSuccess: async () => {
      router.push(`/automations/${automationId}?index=${index + 1}`);
      await utils.automations.getById.invalidate({ id: automationId });
    },
  });

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteAction({ id: action.id });
  };

  return (
    <div className="group">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{action.type}</CardTitle>

          <Button
            onClick={handleDelete}
            variant="ghost"
            size="icon"
            className="h-8 w-8"
          >
            <Trash className="hidden h-4 w-4 text-muted-foreground group-hover:block" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>{action.position}</CardContent>
    </div>
  );
};
