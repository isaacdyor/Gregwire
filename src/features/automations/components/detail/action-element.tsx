import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Action } from "@prisma/client";
import { Plus } from "lucide-react";

export const ActionElement: React.FC<{
  action: Action;
  setAutomationIndex: (index: number | null) => void;
  index: number;
  isLast?: boolean;
}> = ({ action, setAutomationIndex, index, isLast = false }) => (
  <div className="relative flex flex-col items-center">
    <Card
      className="relative w-96 hover:cursor-pointer"
      onClick={() => setAutomationIndex(index)}
    >
      <CardHeader>
        <CardTitle>{action.type}</CardTitle>
      </CardHeader>
      <CardContent>{action.id}</CardContent>
    </Card>
    <div className="relative flex flex-col items-center">
      <div className="h-[16px] w-0.5 bg-border" />
      <div className="group flex h-8 w-8 items-center justify-center rounded-full hover:cursor-pointer hover:bg-secondary">
        <Plus size={20} className="text-muted-foreground" />
      </div>
      {!isLast && <div className="h-[17px] w-0.5 bg-border" />}
    </div>
  </div>
);
