import { ActionType } from "@prisma/client";
import { ActionCreateInputSchema, ActionSchema } from "prisma/generated/zod";
import { z } from "zod";

export const ActionDataSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal(ActionType.SEND_EMAIL),
    to: z.string().email(),
    subject: z.string(),
    body: z.string(),
  }),
  z.object({
    type: z.literal(ActionType.SEND_SLACK_MESSAGE),
    channel: z.string(),
    message: z.string(),
  }),
]);

export const TypedActionCreateInputSchema = z.intersection(
  ActionCreateInputSchema,
  z.object({
    actionData: ActionDataSchema,
  }),
);

export const TypedActionSchema = ActionSchema.extend({
  actionData: ActionDataSchema,
});

export type Action = z.infer<typeof TypedActionSchema>;
