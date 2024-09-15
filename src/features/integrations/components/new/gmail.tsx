import { Button } from "@/components/ui/button";
import { integrateGmail } from "../../actions/new-integration";

export const GmailIntegration: React.FC = () => {
  const handleIntegration = async () => {
    try {
      const result = await integrateGmail();
      if (result.success && result.authorizationUrl) {
        console.log("Redirecting to:", result.authorizationUrl);
        window.location.href = result.authorizationUrl;
      } else {
        console.error(result.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Button onClick={handleIntegration}>Connect to gmail</Button>
    </div>
  );
};
