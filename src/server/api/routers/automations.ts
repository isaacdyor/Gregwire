import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import { z } from "zod";

// Define the input schema for creating an automation
const AutomationCreateInputSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  // Add more fields as needed for your automation
});

export const automationsRouter = createTRPCRouter({
  getAll: privateProcedure.query(async ({ ctx }) => {
    return ctx.db.automation.findMany({
      where: {
        userId: ctx.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),

  create: privateProcedure
    .input(AutomationCreateInputSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.automation.create({
        data: {
          ...input,
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
      });
    }),
});
