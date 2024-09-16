import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { UserCreateInputSchema } from "prisma/generated/zod";

export const usersRouter = createTRPCRouter({
  create: publicProcedure
    .input(UserCreateInputSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user.create({
        data: {
          userId: input.userId,
          email: input.email,
          name: input.name,
        },
      });
    }),
});
