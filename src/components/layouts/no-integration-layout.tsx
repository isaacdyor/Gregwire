import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

export const NoIntegrationLayout: React.FC<{ genericType?: string }> = ({
  genericType,
}) => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col gap-2 pb-40">
        <p className="text-muted-foreground">
          No {genericType} integrations found.
        </p>
        <Link
          href="/integrations/new"
          className={cn(
            buttonVariants({ size: "sm" }),
            "flex items-center gap-2",
          )}
        >
          Add new
          <Plus className="h-6 w-6" />
        </Link>
      </div>
    </div>
  );
};
