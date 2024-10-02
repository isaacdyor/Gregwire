import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import { AutomationCreateInputSchema } from "prisma/generated/zod";
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

  create: privateProcedure
    .input(AutomationCreateInputSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.automation.create({
        data: {
          ...input,
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
});
