import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Make sure this is set in your environment variables
});

export const llmRouter = createTRPCRouter({
  chat: publicProcedure
    .input(
      z.object({
        messages: z.array(
          z.object({
            role: z.enum(["system", "user", "assistant"]),
            content: z.string(),
          }),
        ),
      }),
    )
    .mutation(async ({ input }) => {
      const { messages } = input;

      try {
        const completion = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages,
          max_tokens: 100,
          temperature: 0.5,
        });

        return {
          success: true,
          message: completion.choices[0]?.message,
          usage: completion.usage,
        };
      } catch (error) {
        console.error("OpenAI API error:", error);
        return {
          success: false,
          error: "Failed to generate response",
        };
      }
    }),
});
