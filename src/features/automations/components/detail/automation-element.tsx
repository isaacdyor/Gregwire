import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

export const AutomationElement: React.FC<{
  title: string;
  content: string;
  isLast?: boolean;
}> = ({ title, content, isLast = false }) => (
  <div className="flex items-center">
    <Card className="relative h-[400px] w-72 hover:cursor-pointer">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{content}</CardContent>
      <div className="absolute -right-4 top-1/2 h-0.5 w-[16px] -translate-y-1/2 bg-border" />
      <div className="group absolute -right-12 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full hover:cursor-pointer hover:bg-secondary">
        <Plus size={20} className="text-muted-foreground" />
      </div>
      {!isLast && (
        <div className="absolute -right-[65px] top-1/2 h-0.5 w-[17px] -translate-y-1/2 bg-border" />
      )}
    </Card>
  </div>
);
