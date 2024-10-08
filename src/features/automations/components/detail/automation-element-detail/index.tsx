import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAutomationStore } from "@/stores/automations";
import { X } from "lucide-react";
import { TriggerDetail } from "./trigger-detail";
import { ActionDetail } from "./action-detail";

export const AutomationElementDetail: React.FC = () => {
  const activeIndex = useAutomationStore((state) => state.activeIndex);
  const setActiveIndex = useAutomationStore((state) => state.setActiveIndex);

  const { automation } = useAutomationStore((state) => state);

  if (activeIndex === null || !automation?.trigger) return null;

  const trigger = automation.trigger;
  const action = automation.actions[activeIndex - 1];

  if (activeIndex !== 0 && !action) return null;

  return (
    <Card className="absolute right-2 top-2 z-10 h-[calc(100%-16px)] w-96 overflow-hidden">
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2"
        onClick={() => setActiveIndex(null)}
      >
        <X className="h-4 w-4" />
      </Button>
      <CardHeader>
        <CardTitle>
          {activeIndex === 0 ? "Trigger" : `Action ${activeIndex}`}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {activeIndex === 0 ? (
          <TriggerDetail trigger={trigger} />
        ) : (
          <ActionDetail action={action!} />
        )}
      </CardContent>
    </Card>
  );
};
