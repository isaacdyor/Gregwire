import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Trigger } from "@prisma/client";
import { AddActionButton } from "./add-action-button";

export const TriggerElement: React.FC<{
  trigger: Trigger | null;
  setAutomationIndex: (index: number) => void;
}> = ({ trigger, setAutomationIndex }) => (
  <div className="relative flex w-[calc(100%-438px)] flex-col items-center">
    <Card
      className="relative w-96 hover:cursor-pointer"
      onClick={() => setAutomationIndex(0)}
    >
      <CardHeader>
        <CardTitle>{trigger?.type}</CardTitle>
      </CardHeader>
      <CardContent>{trigger?.id}</CardContent>
    </Card>
    <div className="relative flex flex-col items-center">
      <div className="h-[16px] w-0.5 bg-border" />
      <AddActionButton
        firstIndex={0}
        automationId={trigger?.automationId ?? ""}
      />
    </div>
  </div>
);
