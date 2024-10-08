import { ActionType } from "@prisma/client";
import { ActionCreateInputSchema, ActionSchema } from "prisma/generated/zod";
import { z } from "zod";

const InputFieldSchema = z.object({
  inputType: z.enum(["text", "textarea", "select", "email", "number"]),
  label: z.string(),
  placeholder: z.string().optional(),
  options: z.array(z.string()).optional(), // For select inputs
});

// Define a type for fields with input
export type FieldWithInput<T extends z.ZodTypeAny> = z.ZodObject<{
  value: T;
  input: typeof InputFieldSchema;
}>;

// Helper function to create a field with input
const createFieldWithInput = <T extends z.ZodTypeAny>(
  valueSchema: T,
): FieldWithInput<T> =>
  z.object({
    value: valueSchema,
    input: InputFieldSchema,
  });

export const ActionDataSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal(ActionType.SEND_EMAIL),
    to: createFieldWithInput(z.string().email()),
    subject: createFieldWithInput(z.string()),
    body: createFieldWithInput(z.string()),
  }),
  z.object({
    type: z.literal(ActionType.SEND_SLACK_MESSAGE),
    channel: createFieldWithInput(z.string()),
    message: createFieldWithInput(z.string()),
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
