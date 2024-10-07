import { type Prisma } from "@prisma/client";

export type AutomationInclude = Prisma.AutomationGetPayload<{
  include: {
    trigger: true;
    actions: true;
  };
}>;
