import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import { AutomationUpdateInputSchema } from "prisma/generated/zod";

export const triggersRouter = createTRPCRouter({
  create: privateProcedure.mutation(async ({ ctx }) => {
    return ctx.db.automation.create({
      data: {
        userId: ctx.user.id,
      },
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
