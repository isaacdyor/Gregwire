import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Trigger } from "@prisma/client";

export const TriggerElement: React.FC<{
  trigger: Trigger | null;
}> = ({ trigger }) => {
  return (
    <>
      <CardHeader>
        <CardTitle>{trigger?.type}</CardTitle>
      </CardHeader>
      <CardContent>{trigger?.id}</CardContent>
    </>
  );
};
