import { useAutomationStore } from "@/stores/automations";
import { api } from "@/trpc/react";
import { type Action } from "@prisma/client";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export const NewActionButton: React.FC<{
  index: number;
  firstPosition: number;
  secondPosition: number | null;
  automationId: string;
}> = ({ index, firstPosition, secondPosition, automationId }) => {
  const utils = api.useUtils();
  const router = useRouter();
  const setActiveIndex = useAutomationStore((state) => state.setActiveIndex);

  const { mutate: addAction } = api.actions.create.useMutation({
    onMutate: async () => {
      await utils.automations.getById.cancel({ id: automationId });
      const previousAutomation = utils.automations.getById.getData({
        id: automationId,
      });
      const previousActions = previousAutomation?.actions ?? [];
      const newActions: Action[] = [
        ...previousActions,
        {
          id: "new",
          type: "EMAIL",
          position: calculatePosition(),
          automationId,
          createdAt: new Date(),
        },
      ];
      utils.automations.getById.setData({ id: automationId }, (prevData) => {
        if (!prevData) return prevData;
        return {
          ...prevData,
          actions: newActions.sort((a, b) => a.position - b.position),
        };
      });
      setActiveIndex(index + 1);
      console.log("setting index", index + 1);
      return { previousAutomation };
    },
    onError(err, newAction, ctx) {
      utils.automations.getById.setData(
        { id: automationId },
        ctx?.previousAutomation,
      );
    },
    onSuccess: async () => {
      router.push(`/automations/${automationId}?index=${index + 1}`);
      await utils.automations.getById.invalidate({ id: automationId });
    },
  });

  const calculatePosition = () => {
    if (secondPosition) {
      return (firstPosition + secondPosition) / 2;
    }
    return firstPosition + 1;
  };

  const handleClick = () => {
    addAction({
      type: "EMAIL",
      position: calculatePosition(),
      automation: {
        connect: {
          id: automationId,
        },
      },
    });
  };

  return (
    <div
      onClick={handleClick}
      className="group flex h-8 w-8 items-center justify-center rounded-full hover:cursor-pointer hover:bg-border"
    >
      <Plus className="text-muted-foreground" />
    </div>
  );
};
