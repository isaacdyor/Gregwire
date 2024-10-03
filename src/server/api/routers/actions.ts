import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import {
  ActionCreateInputSchema,
  AutomationUpdateInputSchema,
} from "prisma/generated/zod";

export const actionsRouter = createTRPCRouter({
  create: privateProcedure
    .input(ActionCreateInputSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.action.create({
        data: input,
      });
    }),

  update: privateProcedure
    .input(AutomationUpdateInputSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.automation.update({
        where: {
          id: input.id as string,
          userId: ctx.user.id,
        },
        data: input,
      });
    }),
});
