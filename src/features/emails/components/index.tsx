import { type Email } from "@prisma/client";

export const Emails: React.FC<{ emails: Email[] }> = ({ emails }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {emails.map((email, index) => (
        <div key={email.id}>
          <p>{index}</p>
          <p>{email.historyId}</p>
        </div>
      ))}
    </div>
  );
};
