import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { MessageCreateInputSchema } from "prisma/generated/zod";
import { z } from "zod";

export const messagesRouter = createTRPCRouter({
  getAll: privateProcedure.query(async ({ ctx }) => {
    return ctx.db.message.findMany({
      where: {
        slackIntegration: {
          integration: {
            userId: ctx.user.id,
          },
        },
      },
    });
  }),

  getByMessageId: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input: messageId }) => {
      return ctx.db.message.findUnique({
        where: {
          messageId,
        },
      });
    }),

  create: publicProcedure
    .input(MessageCreateInputSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.message.create({
        data: input,
      });
    }),
});
