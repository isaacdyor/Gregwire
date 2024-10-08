import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import {
  AutomationUpdateInputSchema,
  ChatCreateInputSchema,
} from "prisma/generated/zod";
import { z } from "zod";

export const chatsRouter = createTRPCRouter({
  getAll: privateProcedure.query(async ({ ctx }) => {
    return ctx.db.chat.findMany({
      where: {
        userId: ctx.user.id,
      },
    });
  }),

  create: privateProcedure
    .input(ChatCreateInputSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.chat.create({
        data: input,
      });
    }),

  getById: privateProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.chat.findUnique({
        where: {
          id: input.id,
          userId: ctx.user.id,
        },
        include: {
          messages: true,
        },
      });
    }),

  update: privateProcedure
    .input(AutomationUpdateInputSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.automation.update({
        where: {
          id: input.id as string,
          userId: ctx.user.id,
        },
        data: input,
      });
    }),
});
