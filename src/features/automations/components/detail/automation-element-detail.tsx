import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export const AutomationElementDetail: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const automationIndex = searchParams.get("index");

  if (!automationIndex) return null;

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
        <CardTitle>{automationIndex}</CardTitle>
      </CardHeader>
      <CardContent>Y000</CardContent>
    </Card>
  );
};
