import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { integrateGmail } from "../../actions/new-integration";

export const GmailIntegration: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleIntegration = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await integrateGmail();
      if (result.success && result.authorizationUrl) {
        console.log("Redirecting to:", result.authorizationUrl);
        window.location.href = result.authorizationUrl;
      } else {
        setError(result.error ?? "Failed to get authorization URL");
        console.error(result.error);
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Button onClick={handleIntegration} disabled={isLoading}>
        {isLoading ? "Connecting..." : "Connect to Gmail"}
      </Button>
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </div>
  );
};
