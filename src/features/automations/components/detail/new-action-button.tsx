import { useAutomationStore } from "@/stores/automations";
import { api } from "@/trpc/react";
import { type Action } from "@/types/actions";
import { ActionType } from "@prisma/client";
import { Plus } from "lucide-react";

export const NewActionButton: React.FC<{
  index: number;
  firstPosition: number;
  secondPosition: number | null;
  automationId: string;
}> = ({ index, firstPosition, secondPosition, automationId }) => {
  const utils = api.useUtils();

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
          id: crypto.randomUUID(),
          type: ActionType.SEND_EMAIL,
          position: calculatePosition(),
          automationId,
          actionData: {
            type: ActionType.SEND_EMAIL,
            to: {
              value: "hello@example.com",
              input: {
                inputType: "email",
                label: "To",
              },
            },
            subject: {
              value: "Hello",
              input: {
                inputType: "text",
                label: "Subject",
              },
            },
            body: {
              value: "Hello",
              input: {
                inputType: "textarea",
                label: "Body",
              },
            },
          },
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
      type: ActionType.SEND_EMAIL,
      position: calculatePosition(),
      actionData: {
        type: ActionType.SEND_EMAIL,
        subject: {
          value: "Hello",
          input: {
            inputType: "text",
            label: "Subject",
          },
        },
        body: {
          value: "Hello",
          input: {
            inputType: "textarea",
            label: "Body",
          },
        },
        to: {
          value: "hello@example.com",
          input: {
            inputType: "email",
            label: "To",
          },
        },
      },
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
