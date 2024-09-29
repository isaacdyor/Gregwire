import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import { IntegrationType } from "@prisma/client";
import { SlackIntegrationCreateInputSchema } from "prisma/generated/zod";
import { z } from "zod";

export const slackRouter = createTRPCRouter({
  create: privateProcedure
    .input(SlackIntegrationCreateInputSchema)
    .mutation(async ({ ctx, input }) => {
      const slackIntegration = await ctx.db.slackIntegration.create({
        data: {
          teamId: input.teamId,
          botToken: input.botToken,
          appId: input.appId,
          integration: {
            create: {
              type: IntegrationType.SLACK,
              userId: ctx.user.id,
            },
          },
        },
      });

      return {
        slackIntegration,
      };
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
