import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { IntegrationUpdateInputSchema } from "prisma/generated/zod";
import { z } from "zod";

const UpdateIntegrationInputSchema = z.object({
  integration: IntegrationUpdateInputSchema,
  integrationId: z.string(),
});

export const integrationsRouter = createTRPCRouter({
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
});
