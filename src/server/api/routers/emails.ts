import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { EmailCreateInputSchema } from "prisma/generated/zod";
import { z } from "zod";

export const emailsRouter = createTRPCRouter({
  getAll: privateProcedure.query(async ({ ctx }) => {
    return ctx.db.email.findMany({
      where: {
        gmailIntegration: {
          integration: {
            userId: ctx.user.id,
          },
        },
      },
      orderBy: {
        receivedAt: "desc",
      },
    });
  }),

  getByMessageId: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input: messageid }) => {
      return ctx.db.email.findUnique({
        where: {
          messageId: messageid,
        },
      });
    }),

  create: publicProcedure
    .input(EmailCreateInputSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.email.create({
        data: input,
      });
    }),
});
