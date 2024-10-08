import { type Trigger } from "@prisma/client";

export const TriggerDetail: React.FC<{ trigger: Trigger }> = ({ trigger }) => {
  console.log(trigger);
  return <div>{trigger.type}</div>;
};
