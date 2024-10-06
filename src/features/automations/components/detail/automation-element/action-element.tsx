import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/trpc/react";
import { type Action } from "@prisma/client";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
interface ActionElementProps {
  action: Action;
}

export const ActionElement: React.FC<ActionElementProps> = ({ action }) => {
  const utils = api.useUtils();
  const router = useRouter();

  const { mutate: deleteAction } = api.actions.delete.useMutation({
    onSuccess: async () => {
      console.log("invalidating");
      router.refresh();
      await utils.automations.invalidate();
    },
  });

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
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
