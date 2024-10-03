import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import { AutomationUpdateInputSchema } from "prisma/generated/zod";
import { z } from "zod";

export const automationsRouter = createTRPCRouter({
  getAll: privateProcedure.query(async ({ ctx }) => {
    return ctx.db.automation.findMany({
      where: {
        userId: ctx.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),

  create: privateProcedure.mutation(async ({ ctx }) => {
    return ctx.db.automation.create({
      data: {
        userId: ctx.user.id,
      },
    });
  }),

  getById: privateProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.automation.findUnique({
        where: {
          id: input.id,
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
