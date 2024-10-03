import { api } from "@/trpc/react";
import { Loader2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export const AddActionButton: React.FC<{
  firstIndex: number;
  secondIndex?: number;
  automationId: string;
}> = ({ firstIndex, secondIndex, automationId }) => {
  const router = useRouter();

  const { mutate: addAction, isPending } = api.actions.create.useMutation({
    onSuccess: async () => {
      router.refresh();
    },
  });

  const handleClick = () => {
    addAction({
      type: "EMAIL",
      position: 0,
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
      {isPending ? (
        <Loader2 className="animate-spin text-muted-foreground" />
      ) : (
        <Plus className="text-muted-foreground" />
      )}
    </div>
  );
};
