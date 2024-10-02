import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export const AutomationElementDetail: React.FC<{
  automationIndex: number | null;
  setAutomationIndex: (index: number | null) => void;
}> = ({ automationIndex, setAutomationIndex }) => {
  if (automationIndex === null) return null;

  return (
    <Card className="absolute right-2 top-2 z-10 h-[calc(100%-24px)] w-96">
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2"
        onClick={() => setAutomationIndex(null)}
      >
        <X className="h-4 w-4" />
      </Button>
      <CardHeader>
        <CardTitle>{automationIndex}</CardTitle>
      </CardHeader>
      <CardContent>Y000</CardContent>
    </Card>
  );
};
