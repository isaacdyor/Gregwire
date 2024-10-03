"use client";

import {
  type TriggerOrAction,
  type AutomationWithTriggerAndActions,
} from "@/types/automations";
import { useEffect, useState } from "react";
import { AutomationElement } from "./automation-element";
import { AutomationElementDetail } from "./automation-element-detail";
import { Canvas } from "./canvas";
import { useAutomationStore } from "@/stores/automations";

export const AutomationDetail = ({
  automation,
}: {
  automation: AutomationWithTriggerAndActions;
}) => {
  const [automationIndex, setAutomationIndex] = useState<number | null>(0);
  const setAutomation = useAutomationStore((state) => state.setAutomation);

  useEffect(() => {
    setAutomation(automation);
    return () => setAutomation(null); // Cleanup when unmounting
  }, [automation, automation.title, setAutomation]);

  const trigger = automation.trigger;

  const automationElements = [trigger, ...automation.actions].filter(
    Boolean,
  ) as TriggerOrAction[];

  return (
    <div className="relative h-full w-full">
      <Canvas>
        <div className="flex h-[calc(100vh-24px)] flex-col items-center pl-32 pt-24">
          {automationElements.map((automationItem, index) => (
            <AutomationElement
              key={automationItem.id}
              {...automationItem}
              automationElements={automationElements}
              isLast={index === automationElements.length - 1}
              setAutomationIndex={setAutomationIndex}
              index={index}
            />
          ))}
        </div>
      </Canvas>

      <AutomationElementDetail
        automationIndex={automationIndex}
        setAutomationIndex={setAutomationIndex}
      />
    </div>
  );
};
