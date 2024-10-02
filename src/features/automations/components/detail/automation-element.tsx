import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

export const AutomationElement: React.FC<{
  title: string;
  content: string;
  isLast?: boolean;
  setAutomationIndex: (index: number | null) => void;
  index: number;
}> = ({ title, content, isLast = false, setAutomationIndex, index }) => (
  <div className="relative flex flex-col items-center">
    <Card
      className="relative w-96 hover:cursor-pointer"
      onClick={() => setAutomationIndex(index)}
    >
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{content}</CardContent>
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
