import { Chats } from "@/features/chat/components";
import { api } from "@/trpc/server";

export default async function ChatPage() {
  const chats = await api.chats.getAll();

  return <Chats chats={chats} />;
}
