import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { IntegrationType } from "@prisma/client";
import {
  GmailIntegrationCreateInputSchema,
  GmailIntegrationUpdateInputSchema,
} from "prisma/generated/zod";
import { z } from "zod";

export const gmailRouter = createTRPCRouter({
  create: privateProcedure
    .input(GmailIntegrationCreateInputSchema)
    .mutation(async ({ ctx, input }) => {
      const gmailIntegration = await ctx.db.gmailIntegration.create({
        data: {
          email: input.email,
          accessToken: input.accessToken,
          refreshToken: input.refreshToken,
          tokenExpiration: input.tokenExpiration,
          recentHistoryId: input.recentHistoryId,
          integration: {
            create: {
              type: IntegrationType.GMAIL,
              userId: ctx.user.id,
            },
          },
        },
      });

      return gmailIntegration;
    }),

  getAll: privateProcedure.query(async ({ ctx }) => {
    return ctx.db.gmailIntegration.findMany({
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

  getByEmail: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.gmailIntegration.findFirst({
        where: {
          email: input.email,
        },
        include: {
          integration: true,
        },
      });
    }),

  update: publicProcedure
    .input(GmailIntegrationUpdateInputSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, ...updateData } = input;

      return ctx.db.gmailIntegration.update({
        where: {
          id: id as string,
        },
        data: updateData,
      });
    }),
});
