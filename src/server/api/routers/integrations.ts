import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import {
  IntegrationCreateInputSchema,
  IntegrationUpdateInputSchema,
} from "prisma/generated/zod";

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
          scopes: input.scopes,
          createdAt: input.createdAt,
          lastUsedAt: input.lastUsedAt,
          lastRefreshedAt: input.lastRefreshedAt,
          status: input.status,
          genericType: input.genericType,
          metadata: input.metadata,
          user: {
            connect: {
              id: ctx.user.id,
            },
          },
        },
      });
    }),

  update: privateProcedure
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
});
