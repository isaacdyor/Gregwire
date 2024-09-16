import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import { IntegrationCreateInputSchema } from "prisma/generated/zod";

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
});
