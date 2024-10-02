import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Canvas } from "@/features/automations/components/canvas";
// Example usage
const ExampleCard: React.FC<{ title: string; content: string }> = ({
  title,
  content,
}) => (
  <Card className="w-[350px]">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>{content}</CardContent>
  </Card>
);

export default function AutomationPage() {
  const elements = [
    {
      id: "card1",
      component: (
        <ExampleCard title="Card 1" content="This is the first card" />
      ),
      position: { x: 50, y: 50 },
    },
    {
      id: "card2",
      component: (
        <ExampleCard title="Card 2" content="This is the second card" />
      ),
      position: { x: 450, y: 150 },
    },
  ];
  return <Canvas elements={elements} />;
}
