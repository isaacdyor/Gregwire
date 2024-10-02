import { Card, CardContent } from "@/components/ui/card";
import { type Automation } from "@prisma/client";
import Link from "next/link";

export const AutomationCard: React.FC<{ automation: Automation }> = ({
  automation,
}) => {
  return (
    <Link href={`/automations/${automation.id}`}>
      <Card className="group">
        <CardContent className="p-6">
          <p>{automation.title}</p>
        </CardContent>
      </Card>
    </Link>
  );
};
