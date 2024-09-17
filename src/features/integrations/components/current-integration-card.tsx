import { Logos } from "@/components/logos";
import { Card, CardContent } from "@/components/ui/card";
import { integrationConfig } from "@/config/integration-config";
import { type Integration } from "@prisma/client";
import React from "react";

export const CurrentIntegrationCard: React.FC<{ integration: Integration }> = ({
  integration,
}) => {
  const integrationMap = integrationConfig.find(
    (config) => config.type === integration.type,
  );
  const logo = integrationMap?.logo;
  if (!logo) return null;
  const Logo = Logos[logo];
  return (
    <Card className="group">
      <CardContent className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <Logo className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">{integrationMap.title}</h3>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
