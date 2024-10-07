import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import { TypedActionCreateInputSchema } from "@/types/actions";
import { AutomationUpdateInputSchema } from "prisma/generated/zod";
import { z } from "zod";

export const actionsRouter = createTRPCRouter({
  create: privateProcedure
    .input(TypedActionCreateInputSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.action.create({
        data: input,
      });
    }),

  update: privateProcedure
    .input(AutomationUpdateInputSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.action.update({
        where: {
          id: input.id as string,
          automation: {
            userId: ctx.user.id,
          },
        },
        data: input,
      });
    }),

  delete: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.action.delete({
        where: {
          id: input.id,
          automation: {
            userId: ctx.user.id,
          },
        },
      });
    }),
});
