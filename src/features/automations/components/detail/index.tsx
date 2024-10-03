"use client";

import { useAutomationStore } from "@/stores/automations";
import { type AutomationWithTriggerAndActions } from "@/types/automations";
import { useEffect, useState } from "react";

import { AutomationElementDetail } from "./automation-element-detail";
import { Canvas } from "./canvas";
import { TriggerElement } from "./trigger-element";
import { ActionElement } from "./action-element";

export const AutomationDetail = ({
  automation,
}: {
  automation: AutomationWithTriggerAndActions;
}) => {
  const [automationIndex, setAutomationIndex] = useState<number | null>(0);
  const setAutomation = useAutomationStore((state) => state.setAutomation);

  useEffect(() => {
    setAutomation(automation);
    return () => setAutomation(null);
  }, [automation, automation.title, setAutomation]);

  return (
    <div className="relative h-full w-full">
      <Canvas>
        <div className="flex h-[calc(100vh-24px)] w-full flex-col pt-20">
          <TriggerElement
            setAutomationIndex={setAutomationIndex}
            trigger={automation.trigger}
          />
          {automation.actions.map((action, index) => {
            return (
              <ActionElement
                key={action.id}
                action={action}
                index={index}
                setAutomationIndex={setAutomationIndex}
              />
            );
          })}
        </div>
      </Canvas>

      <AutomationElementDetail
        automationIndex={automationIndex}
        setAutomationIndex={setAutomationIndex}
      />
    </div>
  );
};
