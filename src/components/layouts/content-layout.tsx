import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { type ReactNode } from "react";
import { buttonVariants } from "../ui/button";

interface ContentLayoutProps {
  children: ReactNode;
  title: string;
  Icon?: ReactNode;
  backLink?: string;
}

export const ContentLayout: React.FC<ContentLayoutProps> = ({
  children,
  title,
  Icon,
  backLink,
}) => {
  return (
    <div className="flex h-full flex-col gap-8 px-6 py-8">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {backLink && (
            <Link
              href={backLink}
              className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
            >
              <ArrowLeft />
            </Link>
          )}

          <h1 className="text-3xl font-semibold">{title}</h1>
        </div>

        {Icon && Icon}
      </header>
      <main className="h-full">{children}</main>
    </div>
  );
};
