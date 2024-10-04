import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Action } from "@prisma/client";
import { AddActionButton } from "./add-action-button";

export const ActionElement: React.FC<{
  action: Action;
  setAutomationIndex: (index: number) => void;
  index: number;
}> = ({ action, setAutomationIndex, index }) => (
  <div className="relative flex w-[calc(100%-438px)] flex-col items-center">
    <div className="h-[17px] w-0.5 bg-border" />
    <Card
      className="relative w-96 hover:cursor-pointer"
      onClick={() => setAutomationIndex(index + 1)}
    >
      <CardHeader>
        <CardTitle>{action.type}</CardTitle>
      </CardHeader>
      <CardContent>{action.id}</CardContent>
    </Card>
    <div className="relative flex flex-col items-center">
      <div className="h-[16px] w-0.5 bg-border" />
      <AddActionButton
        firstIndex={action.position}
        automationId={action.automationId}
      />
    </div>
  </div>
);
