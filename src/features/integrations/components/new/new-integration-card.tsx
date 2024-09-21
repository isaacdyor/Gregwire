import { Logos } from "@/components/logos";
import { Card, CardContent } from "@/components/ui/card";
import { type IntegrationItem } from "@/config/integration-config";
import { ArrowRight, Loader2 } from "lucide-react";
import * as React from "react";

export const NewIntegrationCard: React.FC<{
  integration: IntegrationItem;
}> = ({ integration }) => {
  const Logo = Logos[integration.logo];
  const [isLoading, setIsLoading] = React.useState(false);

  const handleIntegration = async () => {
    setIsLoading(true);

    try {
      await integration.onIntegrate();
    } catch (error) {
      console.error("Integration failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card
      onClick={handleIntegration}
      className="hover:cursor-pointer hover:border-muted-foreground/30 hover:bg-muted/10"
    >
      <CardContent className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-md transition-colors">
              <Logo className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">{integration.title}</h3>
          </div>
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ArrowRight className="h-4 w-4" />
          )}
        </div>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {integration.description}
        </p>
      </CardContent>
    </Card>
  );
};
