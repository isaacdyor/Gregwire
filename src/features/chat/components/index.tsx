import { type Chat } from "@prisma/client";
import { ChatList } from "./chat-list";

export const Chats: React.FC<{ chats: Chat[] }> = ({ chats }) => {
  return (
    <div className="flex h-full flex-col gap-2">
      <ChatList chats={chats} />
    </div>
  );
};
