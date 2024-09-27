import { type Message } from "@prisma/client";

export const Messages: React.FC<{ messages: Message[] }> = ({ messages }) => {
  return (
    <div>
      <p>hi</p>
    </div>
  );
};
