import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { UserCreateInputSchema } from "prisma/generated/zod";
import { z } from "zod";

export const usersRouter = createTRPCRouter({
  create: publicProcedure
    .input(UserCreateInputSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user.create({
        data: {
          id: input.id,
          name: input.name,
        },
      });
    }),
  getById: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return ctx.db.user.findUnique({
      where: {
        id: input,
      },
    });
  }),
});
