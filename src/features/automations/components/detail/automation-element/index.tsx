import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { type ReactNode } from "react";
import { NewActionButton } from "../new-action-button";

export const AutomationElement: React.FC<{
  children: ReactNode;
  active: boolean;
  setAutomationIndex: (index: number) => void;
  firstPosition: number;
  nextPosition: number | null;
  index: number;
  automationId: string;
}> = ({
  children,
  active,
  setAutomationIndex,
  firstPosition,
  nextPosition,
  index,
  automationId,
}) => {
  return (
    <div className="flex flex-col items-center">
      {index !== 0 && <div className="h-4 w-0.5 bg-border" />}
      <div className="relative">
        <Card
          className={cn(
            "relative w-96 hover:cursor-pointer hover:border-muted-foreground/50",
            active && "border-muted-foreground/50 bg-muted/20",
          )}
          onClick={() => setAutomationIndex(index)}
        >
          {children}
        </Card>
      </div>
      <div className="flex flex-col items-center">
        <div className="h-4 w-0.5 bg-border" />
        <NewActionButton
          index={index}
          firstPosition={firstPosition}
          secondPosition={nextPosition}
          automationId={automationId}
        />
      </div>
    </div>
  );
};
