import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "@/server/api/trpc";
// import { MessageCreateInputSchema } from "prisma/generated/zod";
import { z } from "zod";

// const CreateMessageInputSchema = z.object({
//   message: MessageCreateInputSchema,
//   providerUserId: z.string(),
// });

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

  // create: publicProcedure
  //   .input(CreateMessageInputSchema)
  //   .mutation(async ({ ctx, input }) => {
  //     return ctx.db.message.create({
  //       data: {
  //         messageId: input.message.messageId,
  //         userId: input.message.userId,
  //         channelId: input.message.channelId,
  //         text: input.message.text,
  //         timestamp: input.message.timestamp,
  //         threadTs: input.message.threadTs,
  //         slackIntegration: {
  //           connect: {
  //             teamId: input.providerUserId,
  //           },
  //         },
  //       },
  //     });
  //   }),
});
