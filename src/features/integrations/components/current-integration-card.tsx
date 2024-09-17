import { Card } from "@/components/ui/card";
import { type Integration } from "@prisma/client";
import React from "react";

export const CurrentIntegrationCard: React.FC<{ integration: Integration }> = ({
  integration,
}) => {
  return <Card></Card>;
};
