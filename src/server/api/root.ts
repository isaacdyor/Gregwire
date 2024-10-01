import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { usersRouter } from "./routers/users";
import { integrationsRouter } from "./routers/integrations";
import { emailsRouter } from "./routers/emails";
import { messagesRouter } from "./routers/messages";
import { gmailRouter } from "./routers/gmail";
import { slackRouter } from "./routers/slack";
import { llmRouter } from "./routers/llm";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  users: usersRouter,
  integrations: integrationsRouter,
  emails: emailsRouter,
  messages: messagesRouter,
  gmail: gmailRouter,
  slack: slackRouter,
  llm: llmRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
