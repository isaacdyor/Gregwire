// import { type Action, ActionType } from "@prisma/client";
// import { type ActionDataMap, type TypedAction } from "@/types/actions";

// // Utility function to parse the action
// export function parseAction(action: Action): TypedAction {
//   switch (action.type) {
//     case ActionType.SEND_EMAIL:
//       return {
//         ...action,
//         type: ActionType.SEND_EMAIL,
//         action_data:
//           action.action_data as ActionDataMap[typeof ActionType.SEND_EMAIL],
//       };
//     case ActionType.SEND_SLACK_MESSAGE:
//       return {
//         ...action,
//         type: ActionType.SEND_SLACK_MESSAGE,
//         action_data:
//           action.action_data as ActionDataMap[typeof ActionType.SEND_SLACK_MESSAGE],
//       };
//     default:
//       throw new Error(`Unknown action type: ${String(action.type)}`);
//   }
// }
