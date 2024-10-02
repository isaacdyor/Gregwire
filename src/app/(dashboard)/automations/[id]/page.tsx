import { Canvas } from "@/features/automations/components/detail/canvas";

export default function AutomationPage() {
  const elements = [
    {
      title: "Card 1",
      content: "This is the first card",
    },
    {
      title: "Card 2",
      content: "This is the second card",
    },
  ];
  return <Canvas elements={elements} />;
}
