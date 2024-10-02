import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

export const AutomationElement: React.FC<{
  title: string;
  content: string;
}> = ({ title, content }) => (
  <Card className="w-[350px] hover:cursor-pointer">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>{content}</CardContent>
  </Card>
);
