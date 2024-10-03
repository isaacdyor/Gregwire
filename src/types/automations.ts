import { type Action, type Trigger, type Prisma } from "@prisma/client";

type AutomationWithTriggerAndActions = Prisma.AutomationGetPayload<{
  include: {
    trigger: true;
    actions: true;
  };
}>;

type TriggerOrAction = Trigger | Action;

export type { AutomationWithTriggerAndActions, TriggerOrAction };
