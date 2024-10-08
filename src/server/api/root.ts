import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { usersRouter } from "./routers/users";
import { integrationsRouter } from "./routers/integrations";
import { emailsRouter } from "./routers/emails";
import { messagesRouter } from "./routers/messages";
import { gmailRouter } from "./routers/gmail";
import { slackRouter } from "./routers/slack";
import { llmRouter } from "./routers/llm";
import { automationsRouter } from "./routers/automations";
import { triggersRouter } from "./routers/trigger";
import { actionsRouter } from "./routers/actions";
import { chatsRouter } from "./routers/chats";
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
  automations: automationsRouter,
  triggers: triggersRouter,
  actions: actionsRouter,
  chats: chatsRouter,
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
