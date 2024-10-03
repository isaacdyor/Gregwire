"use client";

import { type Automation } from "@prisma/client";
import { useState } from "react";
import { AutomationElement } from "./automation-element";
import { AutomationElementDetail } from "./automation-element-detail";
import { Canvas } from "./canvas";

export const AutomationDetail = ({
  automation,
}: {
  automation: Automation;
}) => {
  const [automationIndex, setAutomationIndex] = useState<number | null>(0);

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
      content: "This is the second card",
    },
    {
      title: "Card 4",
      content: "This is the second card",
    },
    {
      title: "Card 5",
      content: "This is the second card",
    },
  ];
  return (
    <div className="relative h-full w-full">
      <Canvas>
        <div className="flex h-[calc(100vh-24px)] flex-col items-center pl-32 pt-24">
          {automations.map((automation, index) => (
            <AutomationElement
              key={automation.title}
              {...automation}
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
