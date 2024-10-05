import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Action } from "@prisma/client";
import { Trash } from "lucide-react";

interface ActionElementProps {
  action: Action;
}

export const ActionElement: React.FC<ActionElementProps> = ({ action }) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    console.log("delete");
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
