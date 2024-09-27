import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import {
  IntegrationCreateInputSchema,
  IntegrationUpdateInputSchema,
} from "prisma/generated/zod";
import { z } from "zod";

const UpdateIntegrationInputSchema = z.object({
  integration: IntegrationUpdateInputSchema,
  integrationId: z.string(),
});

export const integrationsRouter = createTRPCRouter({
  create: privateProcedure
    .input(IntegrationCreateInputSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.integration.create({
        data: {
          type: input.type,
          providerUserId: input.providerUserId,
          accessToken: input.accessToken,
          refreshToken: input.refreshToken,
          tokenExpiration: input.tokenExpiration,
          recentHistoryId: input.recentHistoryId,
          scopes: input.scopes,
          createdAt: input.createdAt,
          lastUsedAt: input.lastUsedAt,
          lastRefreshedAt: input.lastRefreshedAt,
          status: input.status,
          genericType: input.genericType,
          metadata: input.metadata,
          email: input.email,
          user: {
            connect: {
              id: ctx.user.id,
            },
          },
        },
      });
    }),
  update: publicProcedure
    .input(UpdateIntegrationInputSchema)
    .mutation(async ({ input, ctx }) => {
      const updatedIntegration = await ctx.db.integration.update({
        where: { id: input.integrationId },
        data: input.integration,
      });

      return updatedIntegration;
    }),
  updateCurrentUser: privateProcedure
    .input(IntegrationUpdateInputSchema)
    .mutation(async ({ input, ctx }) => {
      const { id, ...updateData } = input;

      const updatedIntegration = await ctx.db.integration.update({
        where: { id: id as string },
        data: updateData,
      });

      return updatedIntegration;
    }),

  getAll: privateProcedure.query(async ({ ctx }) => {
    return ctx.db.integration.findMany({
      where: {
        userId: ctx.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),

  getByEmail: publicProcedure
    .input(z.object({ email: z.string() }))
    .query(async ({ ctx, input }) => {
      console.log("getByEmail", input);
      return ctx.db.integration.findUnique({
        where: {
          email: input.email,
        },
      });
    }),
});
