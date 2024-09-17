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
    <Card className="group overflow-hidden bg-gradient-to-br from-background to-secondary/10 transition-all hover:scale-105 hover:bg-primary/5 hover:shadow-lg">
      <CardContent className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-md transition-colors">
              <Logo className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">{integration.title}</h3>
          </div>

          <ArrowRight className="h-4 w-4" />
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
          disabled={isLoading}
        >
          {isLoading ? "Integrating..." : "Integrate"}
        </Button>
      </CardFooter>
    </Card>
  );
};
