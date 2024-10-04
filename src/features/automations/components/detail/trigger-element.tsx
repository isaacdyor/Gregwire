import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Trigger } from "@prisma/client";
import { AddActionButton } from "./add-action-button";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

export const TriggerElement: React.FC<{
  trigger: Trigger | null;
  setAutomationIndex: (index: number) => void;
}> = ({ trigger, setAutomationIndex }) => {
  const searchParams = useSearchParams();

  const automationIndex = searchParams.get("index");

  return (
    <div className="relative flex flex-col items-center">
      <div className="bg-background">
        <Card
          className={cn(
            "relative w-96 hover:cursor-pointer hover:border-muted-foreground/50",
            automationIndex !== null &&
              Number(automationIndex) === 0 &&
              "border-muted-foreground/50 bg-muted/20",
          )}
          onClick={() => setAutomationIndex(0)}
        >
          <CardHeader>
            <CardTitle>{trigger?.type}</CardTitle>
          </CardHeader>
          <CardContent>{trigger?.id}</CardContent>
        </Card>
      </div>

      <div className="relative flex flex-col items-center">
        <div className="h-[16px] w-0.5 bg-border" />
        <AddActionButton
          firstIndex={0}
          automationId={trigger?.automationId ?? ""}
        />
      </div>
    </div>
  );
};
