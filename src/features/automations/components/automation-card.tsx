import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export const AutomationCard: React.FC = () => {
  return (
    <Link href="/automations/1">
      <Card className="group">
        <CardContent className="p-6">
          <p>automation</p>
        </CardContent>
      </Card>
    </Link>
  );
};
