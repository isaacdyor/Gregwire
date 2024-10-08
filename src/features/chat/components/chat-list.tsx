import { Button } from "@/components/ui/button";
import { type Chat } from "@prisma/client";
import { Plus } from "lucide-react";

export const ChatList: React.FC<{ chats: Chat[] }> = ({ chats }) => {
  return (
    <div className="flex h-full w-60 flex-col gap-2 border-r p-2">
      <Button size="thin" className="flex items-center gap-2">
        <p className="">New Chat</p>
        <Plus className="h-4 w-4" />
      </Button>
      {chats.map((chat) => (
        <div key={chat.id}>{chat.id}</div>
      ))}
    </div>
  );
};
