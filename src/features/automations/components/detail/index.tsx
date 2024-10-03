"use client";

import { type Automation } from "@prisma/client";
import { useEffect, useState } from "react";
import { AutomationElement } from "./automation-element";
import { AutomationElementDetail } from "./automation-element-detail";
import { Canvas } from "./canvas";
import { useAutomationStore } from "@/stores/automations";

export const AutomationDetail = ({
  automation,
}: {
  automation: Automation;
}) => {
  const [automationIndex, setAutomationIndex] = useState<number | null>(0);
  const setAutomation = useAutomationStore((state) => state.setAutomation);

  useEffect(() => {
    setAutomation(automation);
    return () => setAutomation(null); // Cleanup when unmounting
  }, [automation, automation.title, setAutomation]);

  const automations = [
    {
      title: "Card 1",
      content: "This is the first card",
    },
    {
      title: "Card 2",
      content: "This is the second card",
    },
    {
      title: "Card 3",
      content: "This is the third card",
    },
    {
      title: "Card 4",
      content: "This is the fourth card",
    },
    {
      title: "Card 5",
      content: "This is the fifth card",
    },
  ];

  return (
    <div className="relative h-full w-full">
      <Canvas>
        <div className="flex h-[calc(100vh-24px)] flex-col items-center pl-32 pt-24">
          {automations.map((automationItem, index) => (
            <AutomationElement
              key={automationItem.title}
              {...automationItem}
              isLast={index === automations.length - 1}
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
