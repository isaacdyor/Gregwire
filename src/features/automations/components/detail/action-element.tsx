import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Action } from "@prisma/client";
import { AddActionButton } from "./add-action-button";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

export const ActionElement: React.FC<{
  action: Action;
  setAutomationIndex: (index: number) => void;
  index: number;
}> = ({ action, setAutomationIndex, index }) => {
  const searchParams = useSearchParams();
  const automationIndex = searchParams.get("index");
  return (
    <div className="relative flex flex-col items-center">
      <div className="h-[17px] w-0.5 bg-border" />
      <div className="bg-background">
        <Card
          className={cn(
            "relative w-96 hover:cursor-pointer hover:border-muted-foreground/50",
            Number(automationIndex) === index + 1 &&
              "border-muted-foreground/50 bg-muted/20",
          )}
          onClick={() => setAutomationIndex(index + 1)}
        >
          <CardHeader>
            <CardTitle>{action.type}</CardTitle>
          </CardHeader>
          <CardContent>{action.id}</CardContent>
        </Card>
      </div>
      <div className="relative flex flex-col items-center">
        <div className="h-[16px] w-0.5 bg-border" />
        <AddActionButton
          firstIndex={action.position}
          automationId={action.automationId}
        />
      </div>
    </div>
  );
};
