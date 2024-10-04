import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAutomationStore } from "@/stores/automations";
import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export const AutomationElementDetail: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const automationIndex = searchParams.get("index");

  const { automation } = useAutomationStore((state) => state);

  const trigger = automation?.trigger;
  const actions = automation?.actions;

  if (!automationIndex) return null;

  const index = parseInt(automationIndex, 10);

  return (
    <Card className="absolute right-2 top-2 z-10 h-[calc(100%-24px)] w-96">
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2"
        onClick={() => router.push(window.location.pathname)}
      >
        <X className="h-4 w-4" />
      </Button>
      <CardHeader>
        <CardTitle>{index === 0 ? "Trigger" : `Action ${index}`}</CardTitle>
      </CardHeader>
      <CardContent>
        {index === 0 ? (
          <div>Trigger Details: {JSON.stringify(trigger)}</div>
        ) : (
          <div>Action Details: {JSON.stringify(actions?.[index - 1])}</div>
        )}
      </CardContent>
    </Card>
  );
};
