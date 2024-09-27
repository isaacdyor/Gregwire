import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import { z } from "zod";

const CreateGmailIntegrationSchema = z.object({
  email: z.string().email(),
  accessToken: z.string(),
  refreshToken: z.string(),
  tokenExpiration: z.date(),
  recentHistoryId: z.string().optional(),
});

export const gmailRouter = createTRPCRouter({
  create: privateProcedure
    .input(CreateGmailIntegrationSchema)
    .mutation(async ({ ctx, input }) => {
      // Create the main Integration record
      const integration = await ctx.db.integration.create({
        data: {
          type: "GMAIL",
          status: "ACTIVE",
          user: {
            connect: {
              id: ctx.user.id,
            },
          },
        },
      });

      // Create the GmailIntegration record
      const gmailIntegration = await ctx.db.gmailIntegration.create({
        data: {
          integrationId: integration.id,
          email: input.email,
          accessToken: input.accessToken,
          refreshToken: input.refreshToken,
          tokenExpiration: input.tokenExpiration,
          recentHistoryId: input.recentHistoryId,
        },
      });

      return {
        integration,
        gmailIntegration,
      };
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

  getByEmail: privateProcedure
    .input(z.object({ email: z.string().email() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.gmailIntegration.findUnique({
        where: {
          email: input.email,
        },
        include: {
          integration: true,
        },
      });
    }),

  update: privateProcedure
    .input(
      z.object({
        id: z.string(),
        accessToken: z.string().optional(),
        refreshToken: z.string().optional(),
        tokenExpiration: z.date().optional(),
        recentHistoryId: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...updateData } = input;

      return ctx.db.gmailIntegration.update({
        where: { id },
        data: updateData,
      });
    }),
});
