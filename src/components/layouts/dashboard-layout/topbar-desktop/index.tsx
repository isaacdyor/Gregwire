import { ArrowUpRight, Bell } from "lucide-react";
import { NavBreadcrumbs } from "./nav-breadcrumbs";

export const TopbarDesktop = () => {
  return (
    <div className="hidden h-10 shrink-0 items-center justify-between gap-4 border-b px-6 text-muted-foreground md:flex">
      <div>
        <NavBreadcrumbs />
      </div>
      <div className="flex items-center gap-4">
        <p className="rounded-md border px-2 text-sm hover:cursor-pointer">
          Roadmap
        </p>
        <div className="flex items-center hover:cursor-pointer">
          <p className="text-sm">Docs</p>
          <ArrowUpRight className="h-4 w-4" />
        </div>
        <Bell className="h-4 w-4 hover:cursor-pointer" />
      </div>
    </div>
  );
};
