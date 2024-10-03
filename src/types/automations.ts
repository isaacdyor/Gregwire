import { type Prisma } from "@prisma/client";

type AutomationWithTriggerAndActions = Prisma.AutomationGetPayload<{
  include: {
    trigger: true;
    actions: true;
  };
}>;

export type { AutomationWithTriggerAndActions };
