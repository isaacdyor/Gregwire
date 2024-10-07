import { type Action, type Prisma, ActionType } from "@prisma/client";

export type AutomationWithTriggerAndActions = Prisma.AutomationGetPayload<{
  include: {
    trigger: true;
    actions: true;
  };
}>;

export interface ActionDataMap {
  [ActionType.SEND_EMAIL]: {
    to: string;
    subject: string;
    body: string;
  };
  [ActionType.SEND_SLACK_MESSAGE]: {
    channel: string;
    message: string;
  };
}

export type ActionData = ActionDataMap[keyof ActionDataMap];

export type TypedAction = {
  [K in ActionType]: Omit<Action, "type" | "action_data"> & {
    type: K;
    action_data: K extends keyof ActionDataMap ? ActionDataMap[K] : never;
  };
}[ActionType];

export function createActionTypeGuard<T extends ActionType>(actionType: T) {
  return (action: TypedAction): action is Extract<TypedAction, { type: T }> => {
    return action.type === actionType;
  };
}

// Create type guards for each action type
export const isSendEmailAction = createActionTypeGuard(ActionType.SEND_EMAIL);
export const isSendSlackMessageAction = createActionTypeGuard(
  ActionType.SEND_SLACK_MESSAGE,
);

// Utility function to parse the action
export function parseAction(action: Action): TypedAction {
  switch (action.type) {
    case ActionType.SEND_EMAIL:
      return {
        ...action,
        type: ActionType.SEND_EMAIL,
        action_data:
          action.action_data as ActionDataMap[typeof ActionType.SEND_EMAIL],
      };
    case ActionType.SEND_SLACK_MESSAGE:
      return {
        ...action,
        type: ActionType.SEND_SLACK_MESSAGE,
        action_data:
          action.action_data as ActionDataMap[typeof ActionType.SEND_SLACK_MESSAGE],
      };
    default:
      throw new Error(`Unknown action type: ${String(action.type)}`);
  }
}
