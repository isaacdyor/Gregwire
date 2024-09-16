import { Button } from "@/components/ui/button";
import { NewIntegration } from "@/features/integrations/components/new";
import { api } from "@/trpc/server";

export default async function NewIntegrationPage() {
  return (
    <div>
      <NewIntegration />
    </div>
  );
}
