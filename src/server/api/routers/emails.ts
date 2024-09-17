import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { EmailCreateInputSchema } from "prisma/generated/zod";
import { z } from "zod";

const CreateEmailInputSchema = z.object({
  email: EmailCreateInputSchema,
  integrationId: z.string(),
});

export const emailsRouter = createTRPCRouter({
  getAll: privateProcedure
    .input(z.string())
    .query(async ({ ctx, input: integrationId }) => {
      // First, verify that the integration belongs to the current user
      const integration = await ctx.db.email.findMany({
        where: {
          id: integrationId,
          integration: {
            userId: ctx.user.id,
          },
        },
      });

      if (!integration) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      // If the integration is verified, proceed to fetch the emails
      return ctx.db.email.findMany({
        where: {
          integrationId: integrationId,
        },
        orderBy: {
          receivedAt: "desc",
        },
      });
    }),

  getByMessageId: privateProcedure
    .input(z.string())
    .query(async ({ ctx, input: messageid }) => {
      return ctx.db.email.findUnique({
        where: {
          messageId: messageid,
        },
      });
    }),

  create: publicProcedure
    .input(CreateEmailInputSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.email.create({
        data: {
          historyId: input.email.historyId,
          messageId: input.email.messageId,
          receivedAt: input.email.receivedAt ?? new Date(),
          processed: input.email.processed ?? false,
          integration: {
            connect: {
              id: input.integrationId,
            },
          },
        },
      });
    }),
});
