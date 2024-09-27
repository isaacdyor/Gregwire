import { type Message } from "@prisma/client";

export const Messages: React.FC<{ messages: Message[] }> = ({ messages }) => {
  console.log(messages);
  return (
    <div>
      <p></p>
    </div>
  );
};
