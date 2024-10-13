import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import { SlackIntegrationCreateInputSchema } from "prisma/generated/zod";
import { z } from "zod";

export const slackRouter = createTRPCRouter({
  create: privateProcedure
    .input(SlackIntegrationCreateInputSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.slackIntegration.create({
        data: input,
      });
    }),

  getAll: privateProcedure.query(async ({ ctx }) => {
    return ctx.db.slackIntegration.findMany({
      where: {
        integration: {
          userId: ctx.user.id,
        },
      },
      include: {
        integration: true,
      },
    });
  }),

  getByTeamId: privateProcedure
    .input(z.object({ teamId: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.slackIntegration.findFirst({
        where: {
          teamId: input.teamId,
          integration: {
            userId: ctx.user.id,
          },
        },
        include: {
          integration: true,
        },
      });
    }),
});
