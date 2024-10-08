import { type Action } from "@/types/actions";
import { ActionType } from "@prisma/client";

export const ActionDetail: React.FC<{ action: Action }> = ({ action }) => {
  return (
    <div>
      <p>{action.actionData.type}</p>
      {action.actionData.type === ActionType.SEND_EMAIL && (
        <>
          <p>{action.actionData.to}</p>
          <p>{action.actionData.subject}</p>
          <p>{action.actionData.body}</p>
        </>
      )}
    </div>
  );
};
