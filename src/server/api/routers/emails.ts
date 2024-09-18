import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { EmailCreateInputSchema } from "prisma/generated/zod";
import { z } from "zod";

const CreateEmailInputSchema = z.object({
  email: EmailCreateInputSchema,
  integrationEmail: z.string(),
});

export const emailsRouter = createTRPCRouter({
  getAll: privateProcedure.query(async ({ ctx }) => {
    return ctx.db.email.findMany({
      where: {
        integration: {
          userId: ctx.user.id,
        },
      },
      orderBy: {
        receivedAt: "desc",
      },
    });
  }),

  // getByMessageId: publicProcedure
  //   .input(z.string())
  //   .query(async ({ ctx, input: messageid }) => {
  //     return ctx.db.email.findUnique({
  //       where: {
  //         messageId: messageid,
  //       },
  //     });
  //   }),

  create: publicProcedure
    .input(CreateEmailInputSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.email.create({
        data: {
          messageId: input.email.messageId,
          subject: input.email.subject,
          from: input.email.from,
          date: input.email.date,
          body: input.email.body,
          receivedAt: input.email.receivedAt ?? new Date(),
          processed: input.email.processed ?? false,
          integration: {
            connect: {
              email: input.integrationEmail,
            },
          },
        },
      });
    }),
});
