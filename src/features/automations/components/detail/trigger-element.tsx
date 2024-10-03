import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Trigger } from "@prisma/client";
import { Plus } from "lucide-react";

export const TriggerElement: React.FC<{
  trigger: Trigger | null;
  setAutomationIndex: (index: number | null) => void;
}> = ({ trigger, setAutomationIndex }) => (
  <div className="relative flex flex-col items-center">
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
      <div className="group flex h-8 w-8 items-center justify-center rounded-full hover:cursor-pointer hover:bg-border">
        <Plus size={20} className="text-muted-foreground" />
      </div>
    </div>
  </div>
);
