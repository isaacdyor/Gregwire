import { TypedActionCreateInputSchema } from "@/types/actions";
import { type AutomationInclude } from "@/types/automations";

export const parseAutomation = (automation: AutomationInclude) => {
  const parsedActions = automation.actions.map((action) => {
    try {
      return TypedActionCreateInputSchema.parse({
        action,
      });
    } catch (error) {
      console.error(`Failed to parse action ${action.id}:`, error);
      throw new Error(`Invalid action data for action ${action.id}`);
    }
  });

  return {
    ...automation,
    actions: parsedActions,
  };
};

export type AutomationWithTriggerAndActions = ReturnType<
  typeof parseAutomation
>;
