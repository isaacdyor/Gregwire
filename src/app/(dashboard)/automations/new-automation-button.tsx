import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";

export const NewAutomationButton = () => {
  return (
    <Link
      href="/automations/new"
      className={cn(buttonVariants({ size: "sm" }), "flex items-center gap-2")}
    >
      Add new
      <Plus className="h-6 w-6" />
    </Link>
  );
};
