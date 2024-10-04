import { api } from "@/trpc/react";
import { Loader2, Plus } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export const NewActionButton: React.FC<{
  index: number;
  firstPosition: number;
  secondPosition: number | null;
  automationId: string;
}> = ({ index, firstPosition, secondPosition, automationId }) => {
  const [isRevalidating, setIsRevalidating] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const automationIndex = params.get("index");

  const { mutate: addAction, isPending } = api.actions.create.useMutation({
    onSuccess: async () => {
      setIsRevalidating(true);
      if (Number(automationIndex) === index + 1) {
        router.refresh();
      } else {
        router.push(`/automations/${automationId}?index=${index + 1}`);
      }

      setIsRevalidating(false);
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
      {isPending || isRevalidating ? (
        <Loader2 className="animate-spin text-muted-foreground" />
      ) : (
        <Plus className="text-muted-foreground" />
      )}
    </div>
  );
};
