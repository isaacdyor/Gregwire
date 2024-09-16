import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import {
  IntegrationCreateInputSchema,
  IntegrationUpdateArgsSchema,
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
});
