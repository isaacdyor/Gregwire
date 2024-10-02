import { AutomationElement } from "./automation-element";
import { Canvas } from "./canvas";

export const AutomationDetail = () => {
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
    <Canvas>
      <div className="flex h-[calc(100vh-24px)] flex-row items-center gap-16 pl-8">
        {automations.map((automation, index) => (
          <AutomationElement
            key={automation.title}
            {...automation}
            isLast={index === automations.length - 1}
          />
        ))}
      </div>
    </Canvas>
  );
};
