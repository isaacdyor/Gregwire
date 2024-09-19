import { timeAgo } from "@/utils/datetime";
import { type Email } from "@prisma/client";

export const Emails: React.FC<{ emails: Email[] }> = ({ emails }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {emails.map((email) => (
        <div key={email.id}>
          <p>{email.subject}</p>
          <p className="text-xs text-muted-foreground">{email.from}</p>
          <p>{timeAgo(email.receivedAt)}</p>
        </div>
      ))}
    </div>
  );
};
