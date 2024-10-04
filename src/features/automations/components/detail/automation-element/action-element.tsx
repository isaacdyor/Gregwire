import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Action } from "@prisma/client";

export const ActionElement: React.FC<{
  action: Action;
}> = ({ action }) => {
  return (
    <>
      <CardHeader>
        <CardTitle>{action.type}</CardTitle>
      </CardHeader>
      <CardContent>{action.position}</CardContent>
    </>
  );
};
