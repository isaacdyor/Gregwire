import { parseAutomation } from "@/features/automations/utils/parse-automation";
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
        trigger: {
          create: {
            type: "",
          },
        },
      },
    });
  }),

  getById: privateProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const automation = await ctx.db.automation.findUnique({
        where: {
          id: input.id,
          userId: ctx.user.id,
        },
        include: {
          trigger: true,
          actions: {
            orderBy: {
              position: "asc",
            },
          },
        },
      });

      if (!automation) {
        throw new Error("Automation not found");
      }

      return parseAutomation(automation);
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
