"use client";

import { Button } from "@/components/ui/button";
import { GmailIntegration } from "./gmail";
import { api } from "@/trpc/react";

export const NewIntegration = () => {
  const mutation = api.integrations.create.useMutation();

  return (
    <div className="flex">
      <GmailIntegration />
      <Button
        onClick={() =>
          mutation.mutate({
            type: "GMAIL",
            accessToken: "",
            refreshToken: "",
            tokenExpiration: new Date(),
            status: "ACTIVE",
            user: {
              connect: {
                id: "",
              },
            },
          })
        }
      >
        Trial
      </Button>
    </div>
  );
};
