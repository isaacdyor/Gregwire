import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

export const NotFoundLayout: React.FC<{
  type: string;
  url?: string;
  NewButton?: React.ReactNode;
}> = ({ type, url, NewButton }) => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col gap-2 pb-40">
        <p className="text-muted-foreground">No {type} found.</p>
        {url && (
          <Link
            href={url}
            className={cn(
              buttonVariants({ size: "sm" }),
              "flex items-center gap-2",
            )}
          >
            Add new
            <Plus className="h-6 w-6" />
          </Link>
        )}
        {NewButton}
      </div>
    </div>
  );
};
