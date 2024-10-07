import { type Prisma } from "@prisma/client";

export type AutomationWithTriggerAndActions = Prisma.AutomationGetPayload<{
  include: {
    trigger: true;
    actions: true;
  };
}>;
