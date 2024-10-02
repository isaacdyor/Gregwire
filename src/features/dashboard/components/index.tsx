"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { api } from "@/trpc/react";
import { LogoutButton } from "@/components/layouts/dashboard-layout/user-menu/logout-button";
import { SettingsLink } from "@/components/layouts/dashboard-layout/user-menu/settings-link";
import { ToggleTheme } from "@/components/layouts/dashboard-layout/user-menu/toggle-theme";

export const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState("");

  // Use the trpc hook to get the mutation
  const chatMutation = api.llm.chat.useMutation({
    onSuccess: (data) => {
      if (data.success) {
        setResponse(data.message?.content ?? "No content received");
      } else {
        setResponse(data.error ?? "An error occurred");
      }
      setIsLoading(false);
    },
    onError: (error) => {
      setResponse(`Error: ${error.message}`);
      setIsLoading(false);
    },
  });

  const handleClick = async () => {
    setIsLoading(true);
    chatMutation.mutate({
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "Hello, how are you?" },
      ],
    });
  };

  return (
    <div>
      <Button variant="outline" isLoading={isLoading} onClick={handleClick}>
        Click me
      </Button>
      <p>{response}</p>
    </div>
  );
};
