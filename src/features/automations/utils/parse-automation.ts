import { TypedActionSchema } from "@/types/actions";
import { type AutomationInclude } from "@/types/automations";

export const parseAutomation = (automation: AutomationInclude) => {
  const parsedActions = automation.actions
    .map((action) => {
      console.log(JSON.stringify(action));
      try {
        return TypedActionSchema.parse(action);
      } catch (error) {
        console.error(`Failed to parse action ${action.id}:`, error);
        return null; // Return null for failed parses
      }
    })
    .filter((action): action is NonNullable<typeof action> => action !== null); // Remove null values

  return {
    ...automation,
    actions: parsedActions,
  };
};

export type AutomationWithTriggerAndActions = ReturnType<
  typeof parseAutomation
>;
