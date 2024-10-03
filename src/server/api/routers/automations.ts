import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import { AutomationUpdateInputSchema } from "prisma/generated/zod";
import { z } from "zod";
import { type Prisma } from "@prisma/client";

// Assuming you have access to your PrismaClient instance
import { db } from "@/server/db";

// Define the type for the getAll query result
type GetAllAutomationsType = Prisma.PromiseReturnType<
  typeof getAllAutomationsQuery
>;

// Define the query to infer the type
const getAllAutomationsQuery = (userId: string) =>
  db.automation.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: { trigger: true, actions: true },
  });

export const automationsRouter = createTRPCRouter({
  getAll: privateProcedure.query(
    async ({ ctx }): Promise<GetAllAutomationsType> => {
      return getAllAutomationsQuery(ctx.user.id);
    },
  ),

  create: privateProcedure.mutation(async ({ ctx }) => {
    return ctx.db.automation.create({
      data: {
        userId: ctx.user.id,
      },
    });
  }),

  getById: privateProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.automation.findUnique({
        where: {
          id: input.id,
          userId: ctx.user.id,
        },
        include: {
          trigger: true,
          actions: true,
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
