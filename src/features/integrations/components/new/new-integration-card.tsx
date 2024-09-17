import * as React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Logos } from "@/components/logos";
import { type IntegrationItem } from "@/config/integration-config";
import { ArrowRight } from "lucide-react";

export const NewIntegrationCard: React.FC<{
  integration: IntegrationItem;
}> = ({ integration }) => {
  const Logo = Logos[integration.logo];
  const [isIntegrating, setIsIntegrating] = React.useState(false);
  const [integrationStatus, setIntegrationStatus] = React.useState<
    "idle" | "success" | "error"
  >("idle");

  const handleIntegration = async () => {
    setIsIntegrating(true);
    setIntegrationStatus("idle");
    try {
      await integration.onIntegrate();
      setIntegrationStatus("success");
    } catch (error) {
      console.error("Integration failed:", error);
      setIntegrationStatus("error");
    } finally {
      setIsIntegrating(false);
    }
  };

  return (
    <Card className="group overflow-hidden bg-gradient-to-br from-background to-secondary/10 transition-all hover:scale-105 hover:bg-primary/5 hover:shadow-lg">
      <CardContent className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-primary/10 p-3 transition-colors group-hover:bg-primary/20">
              <Logo className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">{integration.title}</h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="opacity-0 transition-opacity group-hover:opacity-100"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {integration.description}
        </p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button
          onClick={handleIntegration}
          variant="outline"
          className="w-full transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
          disabled={isIntegrating}
        >
          {isIntegrating ? "Integrating..." : "Integrate"}
        </Button>
        {integrationStatus === "success" && (
          <p className="mt-2 text-sm text-green-600">Integration successful!</p>
        )}
        {integrationStatus === "error" && (
          <p className="mt-2 text-sm text-red-600">
            Integration failed. Please try again.
          </p>
        )}
      </CardFooter>
    </Card>
  );
};
